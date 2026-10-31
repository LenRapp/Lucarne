import type { ReactNode } from 'react';

/**
 * Icônes au trait fin lumineux : grille 24, trait de 1,6, bouts et jonctions
 * arrondis, sans remplissage. Elles évoquent les lignes du terrain.
 * La couleur vient de `currentColor`, donc du thème.
 */
function Icon({ size = 24, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      className="lc-icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export type IconName =
  | 'quiz'
  | 'duel'
  | 'defi'
  | 'ballon-dor'
  | 'draft'
  | 'coupe'
  | 'classement'
  | 'profil';

/** Point d'interrogation dans un cercle. */
export const IconQuiz = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.3 9.4a2.7 2.7 0 1 1 3.4 2.6c-.9.3-1.3.9-1.3 1.7v.4" />
    <path d="M11.4 17.1h.1" />
  </Icon>
);

/** Deux silhouettes et une croix. */
export const IconDuel = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <circle cx="6" cy="7.6" r="2.5" />
    <path d="M2.4 18.4a3.6 3.6 0 0 1 7.2 0" />
    <circle cx="18" cy="7.6" r="2.5" />
    <path d="M14.4 18.4a3.6 3.6 0 0 1 7.2 0" />
    <path d="M10.4 10.6 13.6 13.8M13.6 10.6 10.4 13.8" />
  </Icon>
);

/** Calendrier avec une étoile. */
export const IconDefi = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <rect x="3" y="4.6" width="18" height="16.4" rx="2.2" />
    <path d="M8 2.6v4M16 2.6v4M3 9.6h18" />
    <path d="m12 11.9.96 1.94 2.14.31-1.55 1.51.37 2.13-1.92-1.01-1.92 1.01.37-2.13-1.55-1.51 2.14-.31z" />
  </Icon>
);

/** Ballon sur un pied. */
export const IconBallonDor = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <circle cx="12" cy="8.4" r="5.6" />
    <path d="m12 5.9 1.9 1.38-.72 2.23h-2.36l-.72-2.23z" />
    <path d="M12 14v3.3M9.6 17.3h4.8M8 20.6h8" />
  </Icon>
);

/** Terrain vu de dessus. */
export const IconDraft = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <rect x="2.6" y="4.4" width="18.8" height="15.2" rx="1.6" />
    <path d="M12 4.4v15.2" />
    <circle cx="12" cy="12" r="2.8" />
    <path d="M2.6 8.6h3.8v6.8H2.6M21.4 8.6h-3.8v6.8h3.8" />
  </Icon>
);

/** Globe. */
export const IconCoupe = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c-3.4 2.6-3.4 15.4 0 18M12 3c3.4 2.6 3.4 15.4 0 18" />
    <path d="M5 6.6h14M5 17.4h14" />
  </Icon>
);

/** Barres de classement. */
export const IconClassement = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <path d="M3.5 20.5h17" />
    <path d="M6.5 20.5v-5.4M12 20.5v-10.6M17.5 20.5v-7.8" />
  </Icon>
);

/** Buste. */
export const IconProfil = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.8 20.4a7.2 7.2 0 0 1 14.4 0" />
  </Icon>
);

/** Coche de bonne réponse. */
export const IconCheck = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);

/** Croix de mauvaise réponse. */
export const IconCross = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
  </Icon>
);

/** Flèche de retour. */
export const IconBack = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Icon>
);
