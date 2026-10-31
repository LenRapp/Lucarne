import type { Difficulty, Question, ThemeId } from '../data/questions/types';

export const QUESTIONS_PER_GAME = 10;
export const SECONDS_PER_QUESTION = 15;
export const POINTS_PER_CORRECT = 3;

/** « general » mélange tous les thèmes ; sinon on reste sur un seul. */
export type ThemeChoice = ThemeId | 'general';

export type QuizSetup = {
  theme: ThemeChoice;
  difficulty: Difficulty;
};

/** Une question déjà jouée, telle qu'elle apparaît dans la correction. */
export type Answered = {
  question: Question;
  /** `null` quand le chrono est arrivé au bout sans réponse. */
  chosen: number | null;
  correct: boolean;
};

type Rng = () => number;

/** Mélange une copie du tableau, sans toucher à l'original (Fisher-Yates). */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Remet les réponses dans un ordre aléatoire pour qu'une question rejouée ne
 * se reconnaisse pas à la position de sa bonne réponse. Un vrai/faux garde son
 * ordre : « Faux, Vrai » se lirait mal.
 */
export function shuffleChoices(question: Question, rng: Rng = Math.random): Question {
  if (question.type === 'vrai-faux') return question;

  const order = shuffle(
    question.choices.map((_, index) => index),
    rng,
  );

  return {
    ...question,
    choices: order.map((index) => question.choices[index]),
    answer: order.indexOf(question.answer),
  };
}

/**
 * Tire les questions d'une partie : on filtre sur le thème et la difficulté,
 * puis on mélange. S'il n'y a pas assez de questions à cette difficulté, on
 * complète avec les autres difficultés du même thème plutôt que de rendre une
 * partie plus courte.
 */
export function pickQuestions(
  bank: readonly Question[],
  setup: QuizSetup,
  count: number = QUESTIONS_PER_GAME,
  rng: Rng = Math.random,
): Question[] {
  const inTheme =
    setup.theme === 'general' ? bank : bank.filter((q) => q.theme === setup.theme);

  const exact = shuffle(
    inTheme.filter((q) => q.difficulty === setup.difficulty),
    rng,
  );

  const picked = exact.slice(0, count);

  if (picked.length < count) {
    const used = new Set(picked.map((q) => q.id));
    const fallback = shuffle(
      inTheme.filter((q) => !used.has(q.id)),
      rng,
    );
    picked.push(...fallback.slice(0, count - picked.length));
  }

  return picked.map((q) => shuffleChoices(q, rng));
}

/** Une réponse non donnée (chrono écoulé) compte comme fausse. */
export function isCorrect(question: Question, chosen: number | null): boolean {
  return chosen !== null && chosen === question.answer;
}

export function totalScore(answers: readonly Answered[]): number {
  return answers.filter((a) => a.correct).length * POINTS_PER_CORRECT;
}

export function correctCount(answers: readonly Answered[]): number {
  return answers.filter((a) => a.correct).length;
}

/** Un mot sur la performance, affiché en fin de partie. */
export function verdict(correct: number, total: number): string {
  const ratio = total === 0 ? 0 : correct / total;
  if (ratio === 1) return 'Sans faute. Chapeau.';
  if (ratio >= 0.8) return 'Du très grand niveau.';
  if (ratio >= 0.6) return 'Solide, tu connais tes classiques.';
  if (ratio >= 0.4) return 'Il y a du métier, mais ça se travaille.';
  if (ratio > 0) return 'La séance vidéo s’impose.';
  return 'Soirée à oublier. On remet ça ?';
}
