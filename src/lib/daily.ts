import { requireSupabase, supabase } from './supabase';

export type DailyResultRow = {
  day: string;
  found: boolean;
  attempts: number;
  score: number;
  played_at: string;
};

export type NewDailyResult = {
  day: string;
  found: boolean;
  attempts: number;
  score: number;
};

/** Le résultat du joueur pour une journée donnée, ou `null` s'il n'a pas joué. */
export async function fetchDailyResult(
  userId: string,
  day: string,
): Promise<DailyResultRow | null> {
  const client = requireSupabase();

  const { data, error } = await client
    .from('daily_results')
    .select('day, found, attempts, score, played_at')
    .eq('user_id', userId)
    .eq('day', day)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as DailyResultRow | null) ?? null;
}

/** Tous les jours déjà joués, pour calculer la série. */
export async function fetchDailyDays(userId: string): Promise<string[]> {
  const client = requireSupabase();

  const { data, error } = await client
    .from('daily_results')
    .select('day')
    .eq('user_id', userId)
    .order('day', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => (row as { day: string }).day);
}

/**
 * Enregistre le défi du jour. La clé primaire de la table interdit une
 * seconde tentative : si elle est violée, c'est que le joueur a déjà joué,
 * et ce n'est pas une erreur à remonter.
 */
export async function saveDailyResult(
  userId: string | null,
  result: NewDailyResult,
): Promise<void> {
  if (!supabase || !userId) return;

  const { error } = await supabase.from('daily_results').insert({
    user_id: userId,
    day: result.day,
    found: result.found,
    attempts: result.attempts,
    score: result.score,
  });

  // 23505 : violation d'unicité, donc défi déjà joué aujourd'hui.
  if (error && error.code !== '23505') throw new Error(error.message);
}
