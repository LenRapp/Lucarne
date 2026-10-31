import { useCallback, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'quit';
  children: ReactNode;
};

/**
 * Bouton de la charte. L'habillage suit le thème courant : vert et carré
 * dans le thème Stade, pilule dorée dans le thème Ballon d'Or.
 * Au clic, un anneau blanc part du point cliqué et s'efface en 300 ms.
 */
export function Button({
  variant = 'primary',
  children,
  className = '',
  onPointerDown,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const ripple = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(event);

      const button = ref.current;
      if (!button) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const box = button.getBoundingClientRect();
      const ring = document.createElement('span');
      ring.className = 'lc-btn__ring';
      ring.style.left = `${event.clientX - box.left}px`;
      ring.style.top = `${event.clientY - box.top}px`;
      button.appendChild(ring);
      window.setTimeout(() => ring.remove(), 300);
    },
    [onPointerDown],
  );

  return (
    <button
      ref={ref}
      type="button"
      className={`lc-btn lc-btn--${variant} ${className}`.trim()}
      onPointerDown={ripple}
      {...rest}
    >
      {children}
    </button>
  );
}
