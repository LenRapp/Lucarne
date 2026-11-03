import { describe, expect, it } from 'vitest';
import { computeStats, type QuizGameRow } from './games';

function partie(over: Partial<QuizGameRow> = {}): QuizGameRow {
  return {
    id: Math.random().toString(36).slice(2),
    theme: 'general',
    difficulty: 'moyen',
    score: 15,
    correct_count: 5,
    total: 10,
    played_at: '2026-10-31T12:00:00Z',
    ...over,
  };
}

describe('computeStats', () => {
  it('rend des compteurs à zéro sans aucune partie', () => {
    expect(computeStats([])).toEqual({
      parties: 0,
      pointsTotal: 0,
      meilleurScore: 0,
      reussite: 0,
      sansFaute: 0,
    });
  });

  it('additionne les points et compte les parties', () => {
    const stats = computeStats([partie({ score: 15 }), partie({ score: 9 })]);
    expect(stats.parties).toBe(2);
    expect(stats.pointsTotal).toBe(24);
  });

  it('retient le meilleur score', () => {
    const stats = computeStats([partie({ score: 9 }), partie({ score: 30 }), partie({ score: 12 })]);
    expect(stats.meilleurScore).toBe(30);
  });

  it('calcule la réussite sur l’ensemble des questions posées', () => {
    const stats = computeStats([
      partie({ correct_count: 10, total: 10 }),
      partie({ correct_count: 5, total: 10 }),
    ]);
    expect(stats.reussite).toBe(75);
  });

  it('arrondit la réussite à l’entier', () => {
    const stats = computeStats([partie({ correct_count: 1, total: 3 })]);
    expect(stats.reussite).toBe(33);
  });

  it('compte les parties sans faute', () => {
    const stats = computeStats([
      partie({ correct_count: 10, total: 10 }),
      partie({ correct_count: 9, total: 10 }),
      partie({ correct_count: 10, total: 10 }),
    ]);
    expect(stats.sansFaute).toBe(2);
  });

  it('ne compte pas une partie vide comme un sans-faute', () => {
    const stats = computeStats([partie({ correct_count: 0, total: 10 })]);
    expect(stats.sansFaute).toBe(0);
  });
});
