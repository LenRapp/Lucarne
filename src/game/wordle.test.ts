import { describe, expect, it } from 'vitest';
import { isWin, normalize, pointsFor, scoreGuess } from './wordle';

/** Écrit un résultat en abrégé : V vert, O orange, point rien. */
function lire(guess: string, answer: string): string {
  return scoreGuess(guess, answer)
    .map((s) => (s === 'right' ? 'V' : s === 'elsewhere' ? 'O' : '.'))
    .join('');
}

describe('normalize', () => {
  it('passe en capitales', () => {
    expect(normalize('Haaland')).toBe('HAALAND');
  });

  it('retire les accents', () => {
    expect(normalize('Mbappé')).toBe('MBAPPE');
  });

  it('retire les apostrophes et les espaces', () => {
    expect(normalize("N'Golo Kanté")).toBe('NGOLOKANTE');
  });

  it('retire les traits d’union', () => {
    expect(normalize('Sánchez-López')).toBe('SANCHEZLOPEZ');
  });
});

describe('scoreGuess', () => {
  it('met tout en vert quand le nom est trouvé', () => {
    expect(lire('ZIDANE', 'ZIDANE')).toBe('VVVVVV');
  });

  it('laisse tout éteint quand aucune lettre ne tombe juste', () => {
    expect(lire('MMMM', 'ZIDA')).toBe('....');
  });

  it('met en orange une lettre présente mais mal placée', () => {
    //  Z I D A N E  cherché, le D est présent mais à une autre place.
    expect(lire('DDDDDD', 'ZIDANE')).toBe('..V...');
  });

  it('mélange vert, orange et éteint', () => {
    // KANE cherché : K bien placé, A présent ailleurs, X absent, E bien placé.
    expect(lire('KAXE', 'KANE')).toBe('VV.V');
  });

  // ------------------- Le cas des lettres en double -------------------

  it('éclaire les deux P de MBAPPE, l’un vert et l’autre orange', () => {
    // MBAPPE contient bien deux P. Ici le second P est bien placé.
    expect(lire('PBAMPE', 'MBAPPE')).toBe('OVVOVV');
  });

  it('n’éclaire qu’un seul Z quand le nom n’en contient qu’un', () => {
    // ZIDANE n'a qu'un Z : le second proposé doit rester éteint.
    expect(lire('ZZDANE', 'ZIDANE')).toBe('V.VVVV');
  });

  it('donne la priorité à la lettre bien placée sur celle mal placée', () => {
    // KANE : un seul N, bien placé en troisième. Le premier N reste éteint.
    expect(lire('NANE', 'KANE')).toBe('.VVV');
  });

  it('n’éclaire pas plus de lettres qu’il n’y en a dans le nom', () => {
    const états = scoreGuess('AAAAAA', 'ZIDANE');
    expect(états.filter((s) => s !== 'none')).toHaveLength(1);
  });
});

describe('isWin', () => {
  it('reconnaît un nom entièrement trouvé', () => {
    expect(isWin(scoreGuess('MESSI', 'MESSI'))).toBe(true);
  });

  it('refuse un nom presque trouvé', () => {
    expect(isWin(scoreGuess('MESSO', 'MESSI'))).toBe(false);
  });

  it('refuse un résultat vide', () => {
    expect(isWin([])).toBe(false);
  });
});

describe('pointsFor', () => {
  it('récompense le plus la trouvaille du premier coup', () => {
    expect(pointsFor(1, true)).toBe(15);
  });

  it('décroît à chaque essai supplémentaire', () => {
    const points = [1, 2, 3, 4, 5, 6].map((n) => pointsFor(n, true));
    for (let i = 1; i < points.length; i++) {
      expect(points[i]).toBeLessThan(points[i - 1]);
    }
  });

  it('donne encore trois points au sixième essai', () => {
    expect(pointsFor(6, true)).toBe(3);
  });

  it('ne donne rien quand le nom n’est pas trouvé', () => {
    expect(pointsFor(6, false)).toBe(0);
  });
});
