import { describe, expect, it } from 'vitest';
import type { Question } from '../data/questions/types';
import {
  POINTS_PER_CORRECT,
  isCorrect,
  pickQuestions,
  shuffle,
  shuffleChoices,
  totalScore,
  verdict,
} from './quiz';

/** Un générateur prévisible, pour que les tests ne dépendent pas du hasard. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
}

function question(over: Partial<Question> & { id: string }): Question {
  return {
    theme: 'coupe-du-monde',
    type: 'qcm',
    difficulty: 'moyen',
    prompt: 'Énoncé',
    choices: ['A', 'B', 'C', 'D'],
    answer: 0,
    explanation: 'Parce que.',
    ...over,
  };
}

const bank: Question[] = [
  ...Array.from({ length: 12 }, (_, i) =>
    question({ id: `cdm-facile-${i}`, difficulty: 'facile' }),
  ),
  ...Array.from({ length: 4 }, (_, i) =>
    question({ id: `cdm-difficile-${i}`, difficulty: 'difficile' }),
  ),
  ...Array.from({ length: 12 }, (_, i) =>
    question({ id: `ldc-facile-${i}`, theme: 'ligue-des-champions', difficulty: 'facile' }),
  ),
];

describe('shuffle', () => {
  it('ne modifie pas le tableau d’origine', () => {
    const source = [1, 2, 3, 4, 5];
    shuffle(source, seeded(7));
    expect(source).toEqual([1, 2, 3, 4, 5]);
  });

  it('garde exactement les mêmes éléments', () => {
    expect(shuffle([1, 2, 3, 4, 5], seeded(7)).sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('shuffleChoices', () => {
  it('fait suivre l’index de la bonne réponse', () => {
    const source = question({ id: 'q', choices: ['Zidane', 'Pelé', 'Cruyff', 'Platini'], answer: 2 });
    const mixed = shuffleChoices(source, seeded(3));

    expect(mixed.choices).toHaveLength(4);
    expect(mixed.choices[mixed.answer]).toBe('Cruyff');
    expect([...mixed.choices].sort()).toEqual([...source.choices].sort());
  });

  it('laisse un vrai/faux dans son ordre', () => {
    const source = question({ id: 'vf', type: 'vrai-faux', choices: ['Vrai', 'Faux'], answer: 1 });
    expect(shuffleChoices(source, seeded(3))).toEqual(source);
  });
});

describe('pickQuestions', () => {
  it('tire le bon nombre de questions', () => {
    const picked = pickQuestions(bank, { theme: 'general', difficulty: 'facile' }, 10, seeded(1));
    expect(picked).toHaveLength(10);
  });

  it('ne tire jamais deux fois la même question', () => {
    const picked = pickQuestions(bank, { theme: 'general', difficulty: 'facile' }, 10, seeded(2));
    expect(new Set(picked.map((q) => q.id)).size).toBe(10);
  });

  it('reste dans le thème demandé', () => {
    const picked = pickQuestions(
      bank,
      { theme: 'ligue-des-champions', difficulty: 'facile' },
      10,
      seeded(4),
    );
    expect(picked.every((q) => q.theme === 'ligue-des-champions')).toBe(true);
  });

  it('respecte la difficulté quand la banque suffit', () => {
    const picked = pickQuestions(
      bank,
      { theme: 'coupe-du-monde', difficulty: 'facile' },
      10,
      seeded(5),
    );
    expect(picked.every((q) => q.difficulty === 'facile')).toBe(true);
  });

  it('complète avec le même thème plutôt que d’écourter la partie', () => {
    const picked = pickQuestions(
      bank,
      { theme: 'coupe-du-monde', difficulty: 'difficile' },
      10,
      seeded(6),
    );
    expect(picked).toHaveLength(10);
    expect(picked.every((q) => q.theme === 'coupe-du-monde')).toBe(true);
    expect(new Set(picked.map((q) => q.id)).size).toBe(10);
  });

  it('rend une partie plus courte seulement si le thème entier est trop petit', () => {
    const picked = pickQuestions(
      bank.slice(0, 3),
      { theme: 'coupe-du-monde', difficulty: 'facile' },
      10,
      seeded(8),
    );
    expect(picked).toHaveLength(3);
  });
});

describe('score', () => {
  const q = question({ id: 'q', answer: 2 });

  it('compte juste quand la réponse est la bonne', () => {
    expect(isCorrect(q, 2)).toBe(true);
  });

  it('compte faux quand la réponse est mauvaise', () => {
    expect(isCorrect(q, 0)).toBe(false);
  });

  it('compte faux quand le chrono est écoulé', () => {
    expect(isCorrect(q, null)).toBe(false);
  });

  it('donne trois points par bonne réponse', () => {
    const answers = [
      { question: q, chosen: 2, correct: true },
      { question: q, chosen: 0, correct: false },
      { question: q, chosen: 2, correct: true },
      { question: q, chosen: null, correct: false },
    ];
    expect(totalScore(answers)).toBe(2 * POINTS_PER_CORRECT);
  });

  it('donne zéro sans aucune bonne réponse', () => {
    expect(totalScore([{ question: q, chosen: null, correct: false }])).toBe(0);
  });
});

describe('verdict', () => {
  it('salue le sans-faute', () => {
    expect(verdict(10, 10)).toMatch(/sans faute/i);
  });

  it('a un mot différent pour un zéro pointé', () => {
    expect(verdict(0, 10)).not.toBe(verdict(10, 10));
  });

  it('ne plante pas sur une partie vide', () => {
    expect(typeof verdict(0, 0)).toBe('string');
  });
});
