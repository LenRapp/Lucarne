import { describe, expect, it } from 'vitest';
import { PLAYERS } from './players';

describe('liste des joueurs', () => {
  it('contient de quoi tenir plus de six mois sans répétition', () => {
    expect(PLAYERS.length).toBeGreaterThanOrEqual(200);
  });

  it('n’a aucun nom en double', () => {
    const clés = PLAYERS.map((p) => p.key);
    const vus = new Set<string>();
    const doublons = clés.filter((k) => (vus.has(k) ? true : (vus.add(k), false)));
    expect(doublons).toEqual([]);
  });

  it('ne garde que des lettres A-Z dans la clé', () => {
    const fautifs = PLAYERS.filter((p) => !/^[A-Z]+$/.test(p.key)).map((p) => p.name);
    expect(fautifs).toEqual([]);
  });

  it('propose des noms jouables, de quatre à douze lettres', () => {
    const fautifs = PLAYERS.filter((p) => p.key.length < 4 || p.key.length > 12).map(
      (p) => `${p.name} (${p.key.length})`,
    );
    expect(fautifs).toEqual([]);
  });

  it('retire bien les accents des clés', () => {
    const mbappe = PLAYERS.find((p) => p.name === 'Mbappé');
    expect(mbappe?.key).toBe('MBAPPE');
  });

  it('donne une indication à chaque joueur', () => {
    const vides = PLAYERS.filter((p) => p.hint.trim().length < 10).map((p) => p.name);
    expect(vides).toEqual([]);
  });

  it('couvre plusieurs longueurs de nom', () => {
    const longueurs = new Set(PLAYERS.map((p) => p.key.length));
    expect(longueurs.size).toBeGreaterThan(5);
  });
});
