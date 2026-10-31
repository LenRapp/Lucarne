import { describe, expect, it } from 'vitest';
import { QUESTIONS, countByTheme } from './index';
import { DIFFICULTIES, QUESTION_TYPES, THEMES } from './types';

describe('banque de questions', () => {
  it('contient au moins cinq cents questions', () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(500);
  });

  it('n’a aucun identifiant en double', () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('n’a aucun énoncé en double', () => {
    const prompts = QUESTIONS.map((q) => q.prompt.toLowerCase().trim());
    const seen = new Set<string>();
    const doublons = prompts.filter((p) => (seen.has(p) ? true : (seen.add(p), false)));
    expect(doublons).toEqual([]);
  });

  it('désigne toujours une bonne réponse qui existe', () => {
    const invalides = QUESTIONS.filter(
      (q) => q.answer < 0 || q.answer >= q.choices.length,
    ).map((q) => q.id);
    expect(invalides).toEqual([]);
  });

  it('propose deux réponses pour un vrai/faux, quatre sinon', () => {
    const invalides = QUESTIONS.filter((q) =>
      q.type === 'vrai-faux' ? q.choices.length !== 2 : q.choices.length !== 4,
    ).map((q) => q.id);
    expect(invalides).toEqual([]);
  });

  it('ne propose jamais deux fois la même réponse dans une question', () => {
    const invalides = QUESTIONS.filter(
      (q) => new Set(q.choices.map((c) => c.toLowerCase())).size !== q.choices.length,
    ).map((q) => q.id);
    expect(invalides).toEqual([]);
  });

  it('utilise « Vrai » et « Faux » dans cet ordre pour les vrai/faux', () => {
    const invalides = QUESTIONS.filter(
      (q) => q.type === 'vrai-faux' && (q.choices[0] !== 'Vrai' || q.choices[1] !== 'Faux'),
    ).map((q) => q.id);
    expect(invalides).toEqual([]);
  });

  it('n’utilise que des thèmes, types et difficultés connus', () => {
    const themes = new Set(THEMES.map((t) => t.id));
    const types = new Set(Object.keys(QUESTION_TYPES));
    const niveaux = new Set(DIFFICULTIES.map((d) => d.id));

    const invalides = QUESTIONS.filter(
      (q) => !themes.has(q.theme) || !types.has(q.type) || !niveaux.has(q.difficulty),
    ).map((q) => q.id);
    expect(invalides).toEqual([]);
  });

  it('donne une explication à chaque question', () => {
    const vides = QUESTIONS.filter((q) => q.explanation.trim().length < 10).map((q) => q.id);
    expect(vides).toEqual([]);
  });

  it('permet une partie complète dans chaque thème et chaque difficulté', () => {
    const manques: string[] = [];
    for (const theme of THEMES) {
      for (const niveau of DIFFICULTIES) {
        const n = QUESTIONS.filter(
          (q) => q.theme === theme.id && q.difficulty === niveau.id,
        ).length;
        if (n < 10) manques.push(`${theme.id} / ${niveau.id} : ${n}`);
      }
    }
    expect(manques).toEqual([]);
  });

  it('couvre les dix thèmes', () => {
    const counts = countByTheme();
    expect(Object.keys(counts).sort()).toEqual([...THEMES.map((t) => t.id)].sort());
  });
});
