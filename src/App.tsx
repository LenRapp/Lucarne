import { useCallback, useState } from 'react';
import { Splash } from './components/Splash';
import { Home } from './screens/Home';

export default function App() {
  const [showSplash, setShowSplash] = useState(Splash.shouldPlay);
  const closeSplash = useCallback(() => setShowSplash(false), []);

  return (
    <>
      {/* Les deux halos de projecteurs, qui respirent derrière tout l'écran */}
      <div className="lc-floodlights" aria-hidden="true">
        <span />
        <span />
      </div>

      {showSplash && <Splash onDone={closeSplash} />}

      <Home />
    </>
  );
}
