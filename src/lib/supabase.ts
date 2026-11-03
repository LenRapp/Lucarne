import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Tant que les deux variables ne sont pas renseignées, l'application tourne
 * sans comptes : on peut jouer, mais rien n'est sauvegardé. Cela évite un
 * écran blanc à qui clone le dépôt sans configurer Supabase.
 */
export const isConfigured = Boolean(url && key);

export const supabase: SupabaseClient | null = isConfigured
  ? createClient(url as string, key as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

/** Le client, ou une erreur claire si on l'appelle sans configuration. */
export function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'Supabase n’est pas configuré : renseigne VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env',
    );
  }
  return supabase;
}
