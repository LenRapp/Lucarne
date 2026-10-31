import type { Question, ThemeId } from './types';
import { BALLON_DOR } from './ballon-dor';
import { CHAMPIONNATS } from './championnats';
import { CLUBS } from './clubs';
import { COUPE_DU_MONDE } from './coupe-du-monde';
import { ENTRAINEURS } from './entraineurs';
import { EQUIPE_DE_FRANCE } from './equipe-de-france';
import { EURO_ET_NATIONS } from './euro-et-nations';
import { LEGENDES } from './legendes';
import { LIGUE_DES_CHAMPIONS } from './ligue-des-champions';
import { TRANSFERTS_RECORDS } from './transferts-records';

/** Toute la banque de questions, tous thèmes confondus. */
export const QUESTIONS: Question[] = [
  ...COUPE_DU_MONDE,
  ...LIGUE_DES_CHAMPIONS,
  ...BALLON_DOR,
  ...EQUIPE_DE_FRANCE,
  ...LEGENDES,
  ...CLUBS,
  ...CHAMPIONNATS,
  ...EURO_ET_NATIONS,
  ...TRANSFERTS_RECORDS,
  ...ENTRAINEURS,
];

/** Combien de questions sont disponibles par thème. */
export function countByTheme(): Record<ThemeId, number> {
  const counts = {} as Record<ThemeId, number>;
  for (const question of QUESTIONS) {
    counts[question.theme] = (counts[question.theme] ?? 0) + 1;
  }
  return counts;
}

export * from './types';
