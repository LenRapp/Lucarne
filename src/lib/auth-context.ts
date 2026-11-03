import { createContext, useContext } from 'react';
import type { Session } from '@supabase/supabase-js';

export type Profile = {
  id: string;
  pseudo: string;
  created_at: string;
};

export type AuthValue = {
  /** `null` tant que personne n'est connecté. */
  session: Session | null;
  profile: Profile | null;
  /** Vrai le temps de retrouver une session existante au démarrage. */
  loading: boolean;
  /** Faux quand le fichier .env n'est pas rempli : on joue sans compte. */
  configured: boolean;
  signUp: (email: string, password: string, pseudo: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isPseudoFree: (pseudo: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthValue | null>(null);

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth doit être utilisé dans un AuthProvider.');
  return value;
}
