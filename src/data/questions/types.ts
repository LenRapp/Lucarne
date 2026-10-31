/** Les thèmes proposés au joueur pour un quiz thématique. */
export const THEMES = [
  { id: 'coupe-du-monde', label: 'Coupes du monde' },
  { id: 'ligue-des-champions', label: 'Ligue des champions' },
  { id: 'ballon-dor', label: 'Ballon d’Or' },
  { id: 'equipe-de-france', label: 'Équipe de France' },
  { id: 'legendes', label: 'Légendes' },
  { id: 'clubs', label: 'Clubs et palmarès' },
  { id: 'championnats', label: 'Championnats' },
  { id: 'euro-et-nations', label: 'Euro et sélections' },
  { id: 'transferts-records', label: 'Transferts et records' },
  { id: 'entraineurs', label: 'Entraîneurs et tactique' },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];

/**
 * La forme de la question change l'énoncé et l'étiquette affichée en haut de
 * l'écran, jamais la mise en page : on reste sur deux ou quatre réponses, comme
 * dans la maquette validée.
 */
export const QUESTION_TYPES = {
  qcm: 'Question',
  'vrai-faux': 'Vrai ou faux',
  devine: 'Devine le joueur',
  date: 'En quelle année',
  intrus: 'Trouve l’intrus',
} as const;

export type QuestionType = keyof typeof QUESTION_TYPES;

export const DIFFICULTIES = [
  { id: 'facile', label: 'Facile' },
  { id: 'moyen', label: 'Moyen' },
  { id: 'difficile', label: 'Difficile' },
] as const;

export type Difficulty = (typeof DIFFICULTIES)[number]['id'];

export type Question = {
  id: string;
  theme: ThemeId;
  type: QuestionType;
  difficulty: Difficulty;
  /** L'énoncé, affiché en grand. */
  prompt: string;
  /** Deux réponses pour un vrai/faux, quatre sinon. */
  choices: string[];
  /** Index de la bonne réponse dans `choices`. */
  answer: number;
  /** Une phrase affichée dans la correction, en fin de partie. */
  explanation: string;
};

export const THEME_LABELS: Record<ThemeId, string> = Object.fromEntries(
  THEMES.map((t) => [t.id, t.label]),
) as Record<ThemeId, string>;
