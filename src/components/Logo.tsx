import './Logo.css';

type LogoMarkProps = {
  /** Côté du symbole, en pixels. */
  size?: number;
  /** Joue la séquence de lancement (tracé, filet, ballon). */
  animated?: boolean;
};

/**
 * Le symbole : l'angle du but vu de face.
 * Poteau et barre en « Γ » blanc, deux lignes de filet en pointillés verts
 * qui suivent l'angle, et le ballon logé dans la lucarne.
 */
export function LogoMark({ size = 48, animated = false }: LogoMarkProps) {
  return (
    <svg
      className={`lc-mark${animated ? ' is-animated' : ''}`}
      viewBox="0 0 128 128"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      {/* Poteau gauche et barre transversale */}
      <path
        className="lc-mark__frame"
        d="M28 116 L28 28 L116 28"
        fill="none"
        stroke="#F2F6FF"
        strokeWidth="9"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Les deux lignes de filet, en pointillés, qui suivent l'angle */}
      <path
        className="lc-mark__net lc-mark__net--near"
        d="M50 118 L50 50 L118 50"
        fill="none"
        stroke="#2BD36B"
        strokeWidth="3"
        strokeDasharray="7 7"
        opacity="0.7"
      />
      <path
        className="lc-mark__net lc-mark__net--far"
        d="M68 118 L68 68 L118 68"
        fill="none"
        stroke="#2BD36B"
        strokeWidth="3"
        strokeDasharray="7 7"
        opacity="0.45"
      />

      {/* Le ballon, logé dans la lucarne */}
      <g className="lc-mark__ball">
        <circle cx="50" cy="50" r="14.5" fill="#070B14" stroke="#2BD36B" strokeWidth="3.5" />
        <polygon
          points="50,43 56.66,47.84 54.11,55.66 45.89,55.66 43.34,47.84"
          fill="#2BD36B"
        />
      </g>
    </svg>
  );
}

type LogoProps = {
  size?: number;
  animated?: boolean;
  /** Affiche « EN PLEIN DANS LE COIN » sous le logotype. */
  withSignature?: boolean;
};

/** Le symbole et le logotype côte à côte, tels qu'en haut de l'accueil. */
export function Logo({ size = 44, animated = false, withSignature = true }: LogoProps) {
  return (
    <span className={`lc-logo${animated ? ' is-animated' : ''}`}>
      <LogoMark size={size} animated={animated} />
      <span className="lc-logo__text">
        <span className="lc-logo__word">Lucarne</span>
        {withSignature && <span className="lc-logo__sign">En plein dans le coin</span>}
      </span>
    </span>
  );
}
