import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import './Splash.css';

const SEEN_KEY = 'lucarne:splash-seen';
/** 2,1 s de séquence, puis le voile s'efface. */
const TOTAL = 2400;

/**
 * La charte prévoit la séquence de lancement « uniquement au premier
 * lancement ». On la rejoue à la demande avec ?splash dans l'adresse.
 */
function shouldPlay(): boolean {
  if (typeof window === 'undefined') return false;
  if (new URLSearchParams(window.location.search).has('splash')) return true;
  try {
    return window.localStorage.getItem(SEEN_KEY) === null;
  } catch {
    // Navigation privée ou stockage bloqué : on joue la séquence.
    return true;
  }
}

export function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Sans stockage, la séquence rejouera au prochain lancement : sans gravité.
    }

    const fade = window.setTimeout(() => setLeaving(true), TOTAL);
    const done = window.setTimeout(onDone, TOTAL + 400);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div
      className={`lc-splash${leaving ? ' is-leaving' : ''}`}
      // Un clic pendant l'animation la termine aussitôt.
      onClick={onDone}
      role="presentation"
    >
      <Logo size={168} animated />
    </div>
  );
}

Splash.shouldPlay = shouldPlay;
