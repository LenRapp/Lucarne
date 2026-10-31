import type { IconName } from './Icons';
import { ICONS } from './iconMap';
import './ModeCard.css';

export type Mode = {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  /** La carte Mon Ballon d'Or est déjà dorée sur l'accueil. */
  gold?: boolean;
};

type ModeCardProps = {
  mode: Mode;
  onSelect?: (id: string) => void;
};

export function ModeCard({ mode, onSelect }: ModeCardProps) {
  const Glyph = ICONS[mode.icon];

  return (
    <button
      type="button"
      className={`lc-mode${mode.gold ? ' lc-mode--gold' : ''}`}
      onClick={() => onSelect?.(mode.id)}
    >
      <span className="lc-mode__icon">
        <Glyph size={38} />
      </span>
      <span className="lc-mode__text">
        <span className="lc-mode__name">{mode.name}</span>
        <span className="lc-mode__desc">{mode.description}</span>
      </span>
    </button>
  );
}
