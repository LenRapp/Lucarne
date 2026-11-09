/**
 * Le défi du jour : retrouver le nom de famille d'un joueur en six essais.
 * Vert pour une lettre bien placée, orange pour une lettre présente ailleurs,
 * et rien pour les autres.
 */

export const MAX_ATTEMPTS = 6;

/** Points gagnés selon l'essai où l'on trouve. Zéro si l'on ne trouve pas. */
const POINTS: number[] = [15, 12, 9, 7, 5, 3];

export function pointsFor(attempt: number, found: boolean): number {
  if (!found) return 0;
  return POINTS[attempt - 1] ?? 0;
}

export type LetterState = 'right' | 'elsewhere' | 'none';

/**
 * Ramène un nom à ses seules lettres A-Z en capitales : « Mbappé » devient
 * MBAPPE, « N'Golo » devient NGOLO. C'est cette forme que le joueur tape.
 */
export function normalize(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

/**
 * Compare une proposition au nom cherché, lettre par lettre.
 *
 * Le piège est celui des lettres en double : une lettre ne peut s'allumer, en
 * vert ou en orange, qu'autant de fois qu'elle apparaît réellement dans le nom.
 * Proposer deux Z dans ZIDANE n'en éclaire qu'un seul, sans quoi le jeu
 * enverrait le joueur chercher une lettre qui n'existe pas.
 */
export function scoreGuess(guess: string, answer: string): LetterState[] {
  const g = [...guess];
  const a = [...answer];
  const states: LetterState[] = g.map(() => 'none');

  // Premier passage : les lettres bien placées, et on met de côté les autres.
  const restantes = new Map<string, number>();
  for (let i = 0; i < g.length; i++) {
    if (g[i] === a[i]) {
      states[i] = 'right';
    } else if (a[i] !== undefined) {
      restantes.set(a[i], (restantes.get(a[i]) ?? 0) + 1);
    }
  }

  // Second passage : les lettres présentes ailleurs, dans la limite du stock.
  for (let i = 0; i < g.length; i++) {
    if (states[i] === 'right') continue;

    const stock = restantes.get(g[i]) ?? 0;
    if (stock > 0) {
      states[i] = 'elsewhere';
      restantes.set(g[i], stock - 1);
    }
  }

  return states;
}

export function isWin(states: readonly LetterState[]): boolean {
  return states.length > 0 && states.every((s) => s === 'right');
}
