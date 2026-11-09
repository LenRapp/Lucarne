import { useCallback, useState } from 'react';
import { Splash } from './components/Splash';
import { Auth } from './screens/Auth';
import { DailyChallenge } from './screens/DailyChallenge';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { QuizPlay } from './screens/QuizPlay';
import { QuizResult } from './screens/QuizResult';
import { QuizSetup } from './screens/QuizSetup';
import { useAuth } from './lib/auth-context';
import { saveQuizGame } from './lib/games';
import { QUESTIONS } from './data/questions';
import { THEME_LABELS, type Question } from './data/questions/types';
import {
  correctCount,
  pickQuestions,
  totalScore,
  type Answered,
  type QuizSetup as Setup,
} from './game/quiz';

/** Les écrans déjà construits. Les autres modes arriveront aux étapes suivantes. */
type Screen =
  | { name: 'home' }
  | { name: 'auth' }
  | { name: 'profile' }
  | { name: 'daily' }
  | { name: 'quiz-setup' }
  | { name: 'quiz-play'; setup: Setup; questions: Question[] }
  | { name: 'quiz-result'; setup: Setup; answers: Answered[] };

function quizLabel(setup: Setup): string {
  return setup.theme === 'general' ? 'Quiz · Général' : `Quiz · ${THEME_LABELS[setup.theme]}`;
}

export default function App() {
  const { session } = useAuth();
  const [showSplash, setShowSplash] = useState(Splash.shouldPlay);
  const [screen, setScreen] = useState<Screen>({ name: 'home' });
  /** Change à chaque partie, pour remonter proprement l'écran de jeu. */
  const [run, setRun] = useState(0);

  const closeSplash = useCallback(() => setShowSplash(false), []);
  const goHome = useCallback(() => setScreen({ name: 'home' }), []);

  const selectMode = useCallback((id: string) => {
    // Les modes non encore construits ne font rien pour l'instant.
    if (id === 'quiz') setScreen({ name: 'quiz-setup' });
    else if (id === 'defi') setScreen({ name: 'daily' });
  }, []);

  /** Le bouton profil mène au profil si l'on est connecté, à l'identification sinon. */
  const openProfile = useCallback(() => {
    if (session) setScreen({ name: 'profile' });
    else setScreen({ name: 'auth' });
  }, [session]);

  /** Lance une partie de quiz : le tirage se fait ici, le moteur ne fait que dérouler. */
  const startQuiz = useCallback((setup: Setup) => {
    setRun((n) => n + 1);
    setScreen({ name: 'quiz-play', setup, questions: pickQuestions(QUESTIONS, setup) });
  }, []);

  /**
   * Fin de partie : on affiche le résultat tout de suite, et la sauvegarde se
   * fait en arrière-plan. Si elle échoue, le joueur garde quand même son écran
   * de résultat — ce serait absurde de le perdre pour un souci de réseau.
   */
  const finishQuiz = useCallback(
    (setup: Setup, answers: Answered[]) => {
      setScreen({ name: 'quiz-result', setup, answers });

      if (!session) return;

      void saveQuizGame(session.user.id, {
        theme: setup.theme,
        difficulty: setup.difficulty,
        score: totalScore(answers),
        correctCount: correctCount(answers),
        total: answers.length,
      }).catch((e) => {
        console.error('La partie n’a pas pu être enregistrée :', e);
      });
    },
    [session],
  );

  return (
    <>
      {/* Les deux halos de projecteurs, qui respirent derrière tout l'écran */}
      <div className="lc-floodlights" aria-hidden="true">
        <span />
        <span />
      </div>

      {showSplash && <Splash onDone={closeSplash} />}

      {screen.name === 'home' && <Home onSelectMode={selectMode} onProfile={openProfile} />}

      {screen.name === 'auth' && (
        <Auth onBack={goHome} onDone={() => setScreen({ name: 'profile' })} />
      )}

      {screen.name === 'profile' && <Profile onBack={goHome} />}

      {screen.name === 'daily' && (
        <DailyChallenge onBack={goHome} onSignIn={() => setScreen({ name: 'auth' })} />
      )}

      {screen.name === 'quiz-setup' && <QuizSetup onBack={goHome} onStart={startQuiz} />}

      {screen.name === 'quiz-play' && (
        <QuizPlay
          // Remonter le composant repart à zéro sur le nouveau tirage.
          key={run}
          questions={screen.questions}
          label={quizLabel(screen.setup)}
          onQuit={goHome}
          onFinish={(answers) => finishQuiz(screen.setup, answers)}
        />
      )}

      {screen.name === 'quiz-result' && (
        <QuizResult
          answers={screen.answers}
          onHome={goHome}
          onReplay={() => startQuiz(screen.setup)}
        />
      )}
    </>
  );
}
