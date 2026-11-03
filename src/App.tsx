import { useCallback, useState } from 'react';
import { Splash } from './components/Splash';
import { Auth } from './screens/Auth';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { QuizPlay } from './screens/QuizPlay';
import { QuizResult } from './screens/QuizResult';
import { QuizSetup } from './screens/QuizSetup';
import { useAuth } from './lib/auth-context';
import { saveQuizGame } from './lib/games';
import { correctCount, totalScore, type Answered, type QuizSetup as Setup } from './game/quiz';

/** Les écrans déjà construits. Les autres modes arriveront aux étapes suivantes. */
type Screen =
  | { name: 'home' }
  | { name: 'auth' }
  | { name: 'profile' }
  | { name: 'quiz-setup' }
  | { name: 'quiz-play'; setup: Setup }
  | { name: 'quiz-result'; setup: Setup; answers: Answered[] };

export default function App() {
  const { session } = useAuth();
  const [showSplash, setShowSplash] = useState(Splash.shouldPlay);
  const [screen, setScreen] = useState<Screen>({ name: 'home' });
  /** Change à chaque partie, pour qu'une revanche retire de nouvelles questions. */
  const [run, setRun] = useState(0);

  const closeSplash = useCallback(() => setShowSplash(false), []);
  const goHome = useCallback(() => setScreen({ name: 'home' }), []);

  const selectMode = useCallback((id: string) => {
    // Seul le quiz est jouable pour l'instant.
    if (id === 'quiz') setScreen({ name: 'quiz-setup' });
  }, []);

  /** Le bouton profil mène au profil si l'on est connecté, à l'identification sinon. */
  const openProfile = useCallback(() => {
    if (session) setScreen({ name: 'profile' });
    else setScreen({ name: 'auth' });
  }, [session]);

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

      {screen.name === 'quiz-setup' && (
        <QuizSetup
          onBack={goHome}
          onStart={(setup) => {
            setRun((n) => n + 1);
            setScreen({ name: 'quiz-play', setup });
          }}
        />
      )}

      {screen.name === 'quiz-play' && (
        <QuizPlay
          // Remonter le composant repart à zéro et retire de nouvelles questions.
          key={run}
          setup={screen.setup}
          onQuit={goHome}
          onFinish={(answers) => finishQuiz(screen.setup, answers)}
        />
      )}

      {screen.name === 'quiz-result' && (
        <QuizResult
          answers={screen.answers}
          onHome={goHome}
          onReplay={() => {
            setRun((n) => n + 1);
            setScreen({ name: 'quiz-play', setup: screen.setup });
          }}
        />
      )}
    </>
  );
}
