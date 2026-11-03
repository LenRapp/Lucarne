import { useState, type FormEvent } from 'react';
import { Button } from '../components/Button';
import { IconBack } from '../components/Icons';
import { Logo } from '../components/Logo';
import { useAuth } from '../lib/auth-context';
import './Auth.css';

type Mode = 'connexion' | 'inscription';

export function Auth({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const { signIn, signUp, isPseudoFree, configured } = useAuth();

  const [mode, setMode] = useState<Mode>('connexion');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [erreur, setErreur] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);

  const inscription = mode === 'inscription';

  async function submit(event: FormEvent) {
    event.preventDefault();
    setErreur(null);
    setMessage(null);

    if (inscription) {
      const propre = pseudo.trim();
      if (propre.length < 3 || propre.length > 20) {
        setErreur('Le pseudo doit faire entre trois et vingt caractères.');
        return;
      }
      if (password.length < 6) {
        setErreur('Le mot de passe doit faire au moins six caractères.');
        return;
      }
    }

    setEnvoi(true);
    try {
      if (inscription) {
        if (!(await isPseudoFree(pseudo.trim()))) {
          setErreur('Ce pseudo est déjà pris. Essaie-en un autre.');
          return;
        }
        await signUp(email.trim(), password, pseudo.trim());
        setMessage(
          'Compte créé. Si Supabase demande une confirmation, ouvre le lien reçu par e-mail avant de te connecter.',
        );
        setMode('connexion');
        setPassword('');
      } else {
        await signIn(email.trim(), password);
        onDone();
      }
    } catch (e) {
      setErreur(e instanceof Error ? e.message : 'Quelque chose s’est mal passé.');
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <div className="lc-auth lc-enter">
      <header className="lc-auth__bar" style={{ '--i': 0 } as React.CSSProperties}>
        <Logo size={38} withSignature={false} />
        <Button variant="secondary" className="lc-auth__back" onClick={onBack}>
          <IconBack size={18} />
          Retour
        </Button>
      </header>

      <div className="lc-auth__panel" style={{ '--i': 1 } as React.CSSProperties}>
        <p className="lc-auth__kicker">{inscription ? 'Nouveau joueur' : 'Content de te revoir'}</p>
        <h1 className="lc-auth__title">
          {inscription ? 'Crée ton compte' : 'Connexion'}
        </h1>

        {!configured && (
          <p className="lc-auth__warn">
            Les comptes ne sont pas encore configurés sur cette installation. Tu peux jouer,
            mais rien ne sera sauvegardé.
          </p>
        )}

        <form className="lc-auth__form" onSubmit={submit}>
          {inscription && (
            <label className="lc-field">
              <span className="lc-label">Pseudo</span>
              <input
                className="lc-input"
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                placeholder="Celui que les autres verront"
                autoComplete="nickname"
                maxLength={20}
                required
              />
            </label>
          )}

          <label className="lc-field">
            <span className="lc-label">Adresse e-mail</span>
            <input
              className="lc-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="toi@exemple.fr"
              autoComplete="email"
              required
            />
          </label>

          <label className="lc-field">
            <span className="lc-label">Mot de passe</span>
            <input
              className="lc-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={inscription ? 'Six caractères au minimum' : ''}
              autoComplete={inscription ? 'new-password' : 'current-password'}
              required
            />
          </label>

          {erreur && (
            <p className="lc-auth__error" role="alert">
              {erreur}
            </p>
          )}
          {message && (
            <p className="lc-auth__ok" role="status">
              {message}
            </p>
          )}

          <Button type="submit" disabled={envoi || !configured}>
            {envoi ? 'Un instant…' : inscription ? 'Créer mon compte' : 'Se connecter'}
          </Button>
        </form>

        <p className="lc-auth__switch">
          {inscription ? 'Tu as déjà un compte ?' : 'Pas encore de compte ?'}{' '}
          <button
            type="button"
            onClick={() => {
              setMode(inscription ? 'connexion' : 'inscription');
              setErreur(null);
              setMessage(null);
            }}
          >
            {inscription ? 'Se connecter' : 'En créer un'}
          </button>
        </p>
      </div>
    </div>
  );
}
