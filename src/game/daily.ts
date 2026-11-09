import type { Player } from '../data/players';

/** La journée au format AAAA-MM-JJ, dans le fuseau du joueur. */
export function dayKey(date: Date = new Date()): string {
  const a = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const j = String(date.getDate()).padStart(2, '0');
  return `${a}-${m}-${j}`;
}

/** Numéro de jour absolu, pour comparer deux dates sans se soucier des mois. */
export function dayNumber(key: string): number {
  const [a, m, j] = key.split('-').map(Number);
  return Math.floor(Date.UTC(a, m - 1, j) / 86_400_000);
}

/** Transforme la date du jour en graine. */
function seedFromDay(key: string): number {
  let hash = 2_166_136_261;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16_777_619);
  }
  return hash >>> 0;
}

/**
 * Désigne le joueur à deviner. Le choix ne dépend que de la date : tout le
 * monde cherche le même nom le même jour, et recharger la page ne change rien.
 *
 * On parcourt la liste dans un ordre propre à chaque jour plutôt que de tirer
 * un index au hasard : deux jours voisins tombent ainsi rarement côte à côte.
 */
export function pickDailyPlayer(players: readonly Player[], key: string = dayKey()): Player {
  const graine = seedFromDay(key);
  return players[graine % players.length];
}

export type Streak = {
  /** Jours consécutifs en cours, aujourd'hui compris s'il a été joué. */
  current: number;
  /** La plus longue série jamais tenue. */
  best: number;
};

/**
 * Calcule la série à partir des jours déjà joués.
 *
 * Une série reste vivante tant qu'il reste la journée en cours pour la
 * prolonger : avoir joué hier mais pas encore aujourd'hui ne la casse pas.
 * Elle ne tombe qu'une fois ce jour-là passé sans partie.
 */
export function computeStreak(days: readonly string[], today: string = dayKey()): Streak {
  if (days.length === 0) return { current: 0, best: 0 };

  const nombres = [...new Set(days.map(dayNumber))].sort((a, b) => a - b);

  let best = 1;
  let courante = 1;
  for (let i = 1; i < nombres.length; i++) {
    courante = nombres[i] === nombres[i - 1] + 1 ? courante + 1 : 1;
    best = Math.max(best, courante);
  }

  // La série en cours ne compte que si elle touche aujourd'hui ou hier.
  const aujourdhui = dayNumber(today);
  const dernier = nombres[nombres.length - 1];
  const current = dernier === aujourdhui || dernier === aujourdhui - 1 ? courante : 0;

  return { current, best };
}
