import { useCallback, useState } from 'react';
import { Splash } from './components/Splash';
import { Home } from './screens/Home';
import { QuizPlay } from './screens/QuizPlay';
import { QuizResult } from './screens/QuizResult';
import { QuizSetup } from './screens/QuizSetup';
import type { Answered, QuizSetup as Setup } from './game/quiz';

/** Les écrans déjà construits. Les autres modes arriveront aux étapes suivantes. */
type Screen =
  | { name: 'home' }
  | { name: 'quiz-setup' }
  | { name: 'quiz-play'; setup: Setup }
  | { name: 'quiz-result'; setup: Setup; answers: Answered[] };

export default function App() {
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

  return (
    <>
      {/* Les deux halos de projecteurs, qui respirent derrière tout l'écran */}
      <div className="lc-floodlights" aria-hidden="true">
        <span />
        <span />
      </div>

      {showSplash && <Splash onDone={closeSplash} />}

      {screen.name === 'home' && <Home onSelectMode={selectMode} />}

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
          onFinish={(answers) =>
            setScreen({ name: 'quiz-result', setup: screen.setup, answers })
          }
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
