import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isConfigured, supabase } from './supabase';
import { AuthContext, type AuthValue, type Profile } from './auth-context';

/** Traduit les messages d'erreur de Supabase, qui arrivent en anglais. */
function traduire(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) return 'Adresse e-mail ou mot de passe incorrect.';
  if (m.includes('user already registered')) return 'Un compte existe déjà avec cette adresse.';
  if (m.includes('password should be at least'))
    return 'Le mot de passe doit faire au moins six caractères.';
  if (
    m.includes('unable to validate email') ||
    m.includes('invalid email') ||
    (m.includes('email address') && m.includes('invalid'))
  )
    return 'Cette adresse e-mail est refusée. Utilise une adresse valide, chez un fournisseur courant.';
  if (m.includes('email not confirmed'))
    return 'Confirme ton adresse e-mail avant de te connecter.';
  if (m.includes('rate limit') || m.includes('too many'))
    return 'Trop de tentatives. Réessaie dans quelques minutes.';
  return message;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(isConfigured);

  // Retrouve une session existante, puis suit les connexions et déconnexions.
  useEffect(() => {
    if (!supabase) return;

    let vivant = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (!vivant) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      // La déconnexion vide le profil ici, et non dans l'effet qui le charge.
      if (!next) setProfile(null);
    });

    return () => {
      vivant = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Charge le profil qui accompagne la session.
  useEffect(() => {
    if (!supabase || !session) return;

    let vivant = true;

    void supabase
      .from('profiles')
      .select('id, pseudo, created_at')
      .eq('id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (vivant) setProfile((data as Profile | null) ?? null);
      });

    return () => {
      vivant = false;
    };
  }, [session]);

  const signUp = useCallback(async (email: string, password: string, pseudo: string) => {
    if (!supabase) throw new Error('Les comptes ne sont pas configurés.');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      // Le pseudo est repris par le déclencheur qui crée le profil.
      options: { data: { pseudo } },
    });

    if (error) throw new Error(traduire(error.message));
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('Les comptes ne sont pas configurés.');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(traduire(error.message));
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  const isPseudoFree = useCallback(async (pseudo: string) => {
    if (!supabase) return true;

    const { data } = await supabase
      .from('profiles')
      .select('id')
      .ilike('pseudo', pseudo)
      .maybeSingle();

    return !data;
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      session,
      profile,
      loading,
      configured: isConfigured,
      signUp,
      signIn,
      signOut,
      isPseudoFree,
    }),
    [session, profile, loading, signUp, signIn, signOut, isPseudoFree],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
