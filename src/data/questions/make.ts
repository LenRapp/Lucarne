import type { Difficulty, Question, QuestionType, ThemeId } from './types';

/**
 * Fabrique les questions d'un thème en numérotant les identifiants toute seule,
 * pour que les fiches restent lisibles et qu'aucun identifiant ne soit doublé.
 */
export function make(theme: ThemeId) {
  let count = 0;

  return function q(
    difficulty: Difficulty,
    type: QuestionType,
    prompt: string,
    choices: string[],
    answer: number,
    explanation: string,
  ): Question {
    count += 1;
    return {
      id: `${theme}-${String(count).padStart(3, '0')}`,
      theme,
      type,
      difficulty,
      prompt,
      choices,
      answer,
      explanation,
    };
  };
}

/** Raccourci pour les vrai/faux : l'ordre des réponses ne change jamais. */
export const VF = ['Vrai', 'Faux'];
