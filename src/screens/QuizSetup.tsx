import { useState } from 'react';
import { Button } from '../components/Button';
import { IconBack } from '../components/Icons';
import { Logo } from '../components/Logo';
import { DIFFICULTIES, THEMES, type Difficulty } from '../data/questions/types';
import { QUESTIONS_PER_GAME, SECONDS_PER_QUESTION, type QuizSetup as Setup, type ThemeChoice } from '../game/quiz';
import './QuizSetup.css';

type Props = {
  onStart: (setup: Setup) => void;
  onBack: () => void;
};

export function QuizSetup({ onStart, onBack }: Props) {
  const [theme, setTheme] = useState<ThemeChoice>('general');
  const [difficulty, setDifficulty] = useState<Difficulty>('moyen');

  return (
    <div className="lc-setup lc-enter">
      <header className="lc-setup__bar" style={{ '--i': 0 } as React.CSSProperties}>
        <Logo size={38} withSignature={false} />
        <Button variant="secondary" className="lc-setup__back" onClick={onBack}>
          <IconBack size={18} />
          Retour
        </Button>
      </header>

      <p className="lc-setup__kicker" style={{ '--i': 1 } as React.CSSProperties}>
        Quiz
      </p>
      <h1 className="lc-setup__title" style={{ '--i': 2 } as React.CSSProperties}>
        Choisis ton terrain
      </h1>
      <p className="lc-setup__lede" style={{ '--i': 3 } as React.CSSProperties}>
        {QUESTIONS_PER_GAME} questions, {SECONDS_PER_QUESTION} secondes chacune. Les formes
        varient&nbsp;: devine le joueur, vrai ou faux, en quelle année, trouve l’intrus.
      </p>

      <section className="lc-setup__block" style={{ '--i': 4 } as React.CSSProperties}>
        <h2 className="lc-label">Thème</h2>
        <div className="lc-chips">
          <button
            type="button"
            className={`lc-chip lc-chip--wide${theme === 'general' ? ' is-on' : ''}`}
            onClick={() => setTheme('general')}
            aria-pressed={theme === 'general'}
          >
            Quiz général
            <span>Toutes les catégories mélangées</span>
          </button>

          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`lc-chip${theme === t.id ? ' is-on' : ''}`}
              onClick={() => setTheme(t.id)}
              aria-pressed={theme === t.id}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="lc-setup__block" style={{ '--i': 5 } as React.CSSProperties}>
        <h2 className="lc-label">Difficulté</h2>
        <div className="lc-chips">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`lc-chip${difficulty === d.id ? ' is-on' : ''}`}
              onClick={() => setDifficulty(d.id)}
              aria-pressed={difficulty === d.id}
            >
              {d.label}
            </button>
          ))}
        </div>
      </section>

      <div className="lc-setup__go" style={{ '--i': 6 } as React.CSSProperties}>
        <Button onClick={() => onStart({ theme, difficulty })}>Coup d’envoi</Button>
      </div>
    </div>
  );
}
