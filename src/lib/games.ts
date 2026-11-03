import { requireSupabase, supabase } from './supabase';
import type { ThemeChoice } from '../game/quiz';
import type { Difficulty } from '../data/questions/types';

/** Une partie telle qu'elle est rangée en base. */
export type QuizGameRow = {
  id: string;
  theme: string;
  difficulty: string;
  score: number;
  correct_count: number;
  total: number;
  played_at: string;
};

export type NewQuizGame = {
  theme: ThemeChoice;
  difficulty: Difficulty;
  score: number;
  correctCount: number;
  total: number;
};

/**
 * Enregistre une partie terminée. Sans compte ou sans configuration, on ne
 * fait rien : la partie reste jouable, elle n'est simplement pas conservée.
 */
export async function saveQuizGame(userId: string | null, game: NewQuizGame): Promise<void> {
  if (!supabase || !userId) return;

  const { error } = await supabase.from('quiz_games').insert({
    user_id: userId,
    theme: game.theme,
    difficulty: game.difficulty,
    score: game.score,
    correct_count: game.correctCount,
    total: game.total,
  });

  if (error) throw new Error(error.message);
}

/** Les dernières parties du joueur, de la plus récente à la plus ancienne. */
export async function fetchMyGames(userId: string, limit = 50): Promise<QuizGameRow[]> {
  const client = requireSupabase();

  const { data, error } = await client
    .from('quiz_games')
    .select('id, theme, difficulty, score, correct_count, total, played_at')
    .eq('user_id', userId)
    .order('played_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as QuizGameRow[];
}

export type QuizStats = {
  parties: number;
  pointsTotal: number;
  meilleurScore: number;
  /** Pourcentage de bonnes réponses, arrondi à l'entier. */
  reussite: number;
  /** Nombre de parties sans aucune faute. */
  sansFaute: number;
};

/** Résume l'historique d'un joueur. Calcul isolé pour rester testable. */
export function computeStats(games: readonly QuizGameRow[]): QuizStats {
  if (games.length === 0) {
    return { parties: 0, pointsTotal: 0, meilleurScore: 0, reussite: 0, sansFaute: 0 };
  }

  let pointsTotal = 0;
  let meilleurScore = 0;
  let bonnes = 0;
  let posees = 0;
  let sansFaute = 0;

  for (const game of games) {
    pointsTotal += game.score;
    meilleurScore = Math.max(meilleurScore, game.score);
    bonnes += game.correct_count;
    posees += game.total;
    if (game.correct_count === game.total) sansFaute += 1;
  }

  return {
    parties: games.length,
    pointsTotal,
    meilleurScore,
    reussite: posees === 0 ? 0 : Math.round((bonnes / posees) * 100),
    sansFaute,
  };
}
