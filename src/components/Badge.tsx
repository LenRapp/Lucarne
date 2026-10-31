import type { ReactNode } from 'react';
import './Badge.css';

type BadgeProps = {
  /** `points` : « +3 PTS » sur fond vert. `rank` : « 1ER · 412 PTS » encadré d'or. */
  variant?: 'points' | 'rank';
  children: ReactNode;
};

export function Badge({ variant = 'points', children }: BadgeProps) {
  return <span className={`lc-badge lc-badge--${variant}`}>{children}</span>;
}
