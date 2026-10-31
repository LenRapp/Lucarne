import { Logo } from '../components/Logo';
import { ModeCard } from '../components/ModeCard';
import { IconProfil } from '../components/Icons';
import { MODES } from '../data/modes';
import { useTimeUntilMidnight } from '../hooks/useTimeUntilMidnight';
import './Home.css';

export function Home({ onSelectMode }: { onSelectMode?: (id: string) => void }) {
  const countdown = useTimeUntilMidnight();

  return (
    <div className="lc-home lc-enter">
      <header className="lc-home__bar" style={{ '--i': 0 } as React.CSSProperties}>
        <Logo />

        <div className="lc-home__tools">
          <span className="lc-home__timer">
            <span className="lc-home__timer-label">Défi du jour</span>
            <span className="lc-home__timer-sep" aria-hidden="true">
              ·
            </span>
            <span className="lc-home__timer-value">{countdown}</span>
          </span>

          <button type="button" className="lc-home__profile" aria-label="Mon profil">
            <IconProfil size={22} />
          </button>
        </div>
      </header>

      <h1 className="lc-home__title" style={{ '--i': 1 } as React.CSSProperties}>
        Ce soir, on joue quoi&nbsp;?
      </h1>

      <div className="lc-home__grid" style={{ '--i': 2 } as React.CSSProperties}>
        {MODES.map((mode) => (
          <ModeCard key={mode.id} mode={mode} onSelect={onSelectMode} />
        ))}
      </div>
    </div>
  );
}
