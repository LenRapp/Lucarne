import { describe, expect, it } from 'vitest';
import { PLAYERS } from '../data/players';
import { computeStreak, dayKey, dayNumber, pickDailyPlayer } from './daily';

describe('dayKey', () => {
  it('écrit la date au format AAAA-MM-JJ', () => {
    expect(dayKey(new Date(2026, 10, 3))).toBe('2026-11-03');
  });

  it('complète les mois et les jours à deux chiffres', () => {
    expect(dayKey(new Date(2026, 0, 7))).toBe('2026-01-07');
  });
});

describe('dayNumber', () => {
  it('donne des numéros qui se suivent d’un jour à l’autre', () => {
    expect(dayNumber('2026-11-04') - dayNumber('2026-11-03')).toBe(1);
  });

  it('enchaîne correctement d’un mois à l’autre', () => {
    expect(dayNumber('2026-12-01') - dayNumber('2026-11-30')).toBe(1);
  });

  it('enchaîne correctement d’une année à l’autre', () => {
    expect(dayNumber('2027-01-01') - dayNumber('2026-12-31')).toBe(1);
  });
});

describe('pickDailyPlayer', () => {
  it('désigne le même joueur pour une même date', () => {
    const a = pickDailyPlayer(PLAYERS, '2026-11-03');
    const b = pickDailyPlayer(PLAYERS, '2026-11-03');
    expect(b.key).toBe(a.key);
  });

  it('change de joueur d’un jour à l’autre', () => {
    const a = pickDailyPlayer(PLAYERS, '2026-11-03');
    const b = pickDailyPlayer(PLAYERS, '2026-11-04');
    expect(b.key).not.toBe(a.key);
  });

  it('désigne toujours un joueur de la liste', () => {
    const clés = new Set(PLAYERS.map((p) => p.key));
    for (let i = 0; i < 400; i++) {
      const jour = dayKey(new Date(2026, 10, 3 + i));
      expect(clés.has(pickDailyPlayer(PLAYERS, jour).key)).toBe(true);
    }
  });

  it('ne tourne pas en rond sur une poignée de noms', () => {
    const vus = new Set<string>();
    for (let i = 0; i < 200; i++) {
      vus.add(pickDailyPlayer(PLAYERS, dayKey(new Date(2026, 10, 3 + i))).key);
    }
    // Sur deux cents jours, on attend une grande variété de noms.
    expect(vus.size).toBeGreaterThan(100);
  });
});

describe('computeStreak', () => {
  it('rend zéro sans aucune partie', () => {
    expect(computeStreak([], '2026-11-03')).toEqual({ current: 0, best: 0 });
  });

  it('compte une série en cours terminée aujourd’hui', () => {
    const jours = ['2026-11-01', '2026-11-02', '2026-11-03'];
    expect(computeStreak(jours, '2026-11-03')).toEqual({ current: 3, best: 3 });
  });

  it('garde la série vivante si l’on a joué hier mais pas encore aujourd’hui', () => {
    expect(computeStreak(['2026-11-01', '2026-11-02'], '2026-11-03').current).toBe(2);
  });

  it('casse la série après un jour entier sans partie', () => {
    expect(computeStreak(['2026-11-01', '2026-11-02'], '2026-11-04').current).toBe(0);
  });

  it('retient la meilleure série même une fois celle-ci rompue', () => {
    const jours = ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-11-03'];
    expect(computeStreak(jours, '2026-11-03')).toEqual({ current: 1, best: 4 });
  });

  it('ne compte qu’une fois un jour enregistré en double', () => {
    expect(computeStreak(['2026-11-02', '2026-11-02', '2026-11-03'], '2026-11-03').current).toBe(2);
  });

  it('accepte des jours donnés dans le désordre', () => {
    const jours = ['2026-11-03', '2026-11-01', '2026-11-02'];
    expect(computeStreak(jours, '2026-11-03')).toEqual({ current: 3, best: 3 });
  });

  it('compte une série d’un seul jour', () => {
    expect(computeStreak(['2026-11-03'], '2026-11-03')).toEqual({ current: 1, best: 1 });
  });
});
