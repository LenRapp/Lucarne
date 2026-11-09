import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../components/Button';
import { IconBack, IconDefi } from '../components/Icons';
import { Logo } from '../components/Logo';
import { PLAYERS } from '../data/players';
import { computeStreak, dayKey, pickDailyPlayer, type Streak } from '../game/daily';
import { MAX_ATTEMPTS, isWin, pointsFor, scoreGuess, type LetterState } from '../game/wordle';
import { useTimeUntilMidnight } from '../hooks/useTimeUntilMidnight';
import { useAuth } from '../lib/auth-context';
import {
  fetchDailyDays,
  fetchDailyResult,
  saveDailyResult,
  type DailyResultRow,
} from '../lib/daily';
import './DailyChallenge.css';

/** Clavier français : on garde la disposition que le joueur a sous les doigts. */
const KEYBOARD = ['AZERTYUIOP', 'QSDFGHJKLM', 'WXCVBN'];

type Status = 'playing' | 'won' | 'lost';

/** Les erreurs techniques de la base ne doivent pas arriver telles quelles à l'écran. */
function lisible(e: unknown): string {
  const brut = e instanceof Error ? e.message : String(e);

  if (brut.includes('daily_results') || brut.includes('attempts') || brut.includes('found')) {
    return 'La base de données n’est pas à jour : rejoue le script supabase/schema.sql dans Supabase. Tu peux jouer, mais ton résultat ne sera pas enregistré.';
  }

  return 'Impossible de retrouver ta série. Tu peux jouer, mais ton résultat ne sera pas enregistré.';
}

type Props = {
  onBack: () => void;
  onSignIn: () => void;
};

export function DailyChallenge({ onBack, onSignIn }: Props) {
  const { session } = useAuth();
  const countdown = useTimeUntilMidnight();

  const today = useMemo(() => dayKey(), []);
  const player = useMemo(() => pickDailyPlayer(PLAYERS, today), [today]);
  const answer = player.key;

  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [status, setStatus] = useState<Status>('playing');
  const [secousse, setSecousse] = useState(false);

  /**
   * La partie est tenue dans des références, et l'état React ne sert qu'à
   * l'affichage. Sans cela, deux touches frappées dans le même instant
   * liraient la même valeur périmée, et la seconde serait perdue.
   */
  const currentRef = useRef('');
  const guessesRef = useRef<string[]>([]);
  const statusRef = useRef<Status>('playing');

  /** Met à jour la ligne en cours, référence et affichage d'un seul geste. */
  const ecrire = useCallback((valeur: string) => {
    currentRef.current = valeur;
    setCurrent(valeur);
  }, []);

  const [charge, setCharge] = useState(false);
  const [dejaJoue, setDejaJoue] = useState<DailyResultRow | null>(null);
  const [streak, setStreak] = useState<Streak>({ current: 0, best: 0 });
  const [erreur, setErreur] = useState<string | null>(null);

  /** Sans compte, il n'y a rien à charger : l'écran s'affiche tout de suite. */
  const chargement = Boolean(session) && !charge;
  const fini = status !== 'playing';

  // Au chargement : a-t-on déjà joué aujourd'hui, et où en est la série ?
  useEffect(() => {
    if (!session) return;

    let vivant = true;

    Promise.all([fetchDailyResult(session.user.id, today), fetchDailyDays(session.user.id)])
      .then(([resultat, jours]) => {
        if (!vivant) return;
        setDejaJoue(resultat);
        setStreak(computeStreak(jours, today));
        setCharge(true);
      })
      .catch((e) => {
        if (!vivant) return;
        console.error('Défi du jour :', e);
        setErreur(lisible(e));
        setCharge(true);
      });

    return () => {
      vivant = false;
    };
  }, [session, today]);

  /** Enregistre la partie terminée et rafraîchit la série. */
  const enregistrer = useCallback(
    (trouve: boolean, essais: number) => {
      if (!session) return;

      void saveDailyResult(session.user.id, {
        day: today,
        found: trouve,
        attempts: essais,
        score: pointsFor(essais, trouve),
      })
        .then(() => fetchDailyDays(session.user.id))
        .then((jours) => setStreak(computeStreak(jours, today)))
        .catch((e) => console.error('Le défi n’a pas pu être enregistré :', e));
    },
    [session, today],
  );

  /** Valide la ligne en cours. */
  const valider = useCallback(() => {
    const ligne = currentRef.current;

    if (ligne.length !== answer.length) {
      setSecousse(true);
      window.setTimeout(() => setSecousse(false), 400);
      return;
    }

    const essais = [...guessesRef.current, ligne];
    guessesRef.current = essais;
    setGuesses(essais);
    ecrire('');

    if (isWin(scoreGuess(ligne, answer))) {
      statusRef.current = 'won';
      setStatus('won');
      enregistrer(true, essais.length);
    } else if (essais.length >= MAX_ATTEMPTS) {
      statusRef.current = 'lost';
      setStatus('lost');
      enregistrer(false, MAX_ATTEMPTS);
    }
  }, [answer, enregistrer, ecrire]);

  /** Une touche, qu'elle vienne du clavier physique ou de celui à l'écran. */
  const taper = useCallback(
    (touche: string) => {
      if (statusRef.current !== 'playing') return;

      if (touche === 'ENTER') {
        valider();
      } else if (touche === 'BACK') {
        ecrire(currentRef.current.slice(0, -1));
      } else if (/^[A-Z]$/.test(touche)) {
        if (currentRef.current.length < answer.length) {
          ecrire(currentRef.current + touche);
        }
      }
    },
    [valider, answer.length, ecrire],
  );

  // Le clavier physique, pour jouer sans quitter les touches.
  useEffect(() => {
    if (dejaJoue || fini) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'Enter') taper('ENTER');
      else if (e.key === 'Backspace') taper('BACK');
      else if (/^[a-zA-Z]$/.test(e.key)) taper(e.key.toUpperCase());
      else return;

      e.preventDefault();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [taper, dejaJoue, fini]);

  /**
   * Tout le monde joue, avec ou sans compte. Le compte ne sert qu'à conserver
   * la série et les statistiques ; sans lui, la partie se joue et s'oublie.
   */
  const jouable = !chargement && !dejaJoue;

  // Les six lignes du plateau : jouées, en cours, puis vides.
  const lignes = Array.from({ length: MAX_ATTEMPTS }, (_, i) => {
    if (i < guesses.length) {
      return { lettres: guesses[i], etats: scoreGuess(guesses[i], answer), jouee: true };
    }
    if (i === guesses.length && !fini) {
      return { lettres: current, etats: null as LetterState[] | null, jouee: false };
    }
    return { lettres: '', etats: null as LetterState[] | null, jouee: false };
  });

  return (
    <div className="lc-daily lc-enter">
      <header className="lc-daily__bar" style={{ '--i': 0 } as React.CSSProperties}>
        <Logo size={38} withSignature={false} />
        <Button variant="secondary" className="lc-daily__back" onClick={onBack}>
          <IconBack size={18} />
          Retour
        </Button>
      </header>

      <div className="lc-daily__head" style={{ '--i': 1 } as React.CSSProperties}>
        <span className="lc-daily__glyph">
          <IconDefi size={44} />
        </span>
        <div>
          <p className="lc-daily__kicker">Défi du jour</p>
          <h1 className="lc-daily__title">Trouve le joueur</h1>
          <p className="lc-daily__rule">
            {answer.length} lettres · {MAX_ATTEMPTS} essais · nom de famille
          </p>
        </div>
      </div>

      {session && (
        <div className="lc-daily__streaks" style={{ '--i': 2 } as React.CSSProperties}>
          <div className="lc-daily__streak">
            <span className="lc-label">Série en cours</span>
            <b>
              {streak.current} <small>jour{streak.current > 1 ? 's' : ''}</small>
            </b>
          </div>
          <div className="lc-daily__streak">
            <span className="lc-label">Record</span>
            <b>
              {streak.best} <small>jour{streak.best > 1 ? 's' : ''}</small>
            </b>
          </div>
          <div className="lc-daily__streak">
            <span className="lc-label">Prochain défi dans</span>
            <b className="lc-daily__clock">{countdown}</b>
          </div>
        </div>
      )}

      {erreur && (
        <p className="lc-daily__error" style={{ '--i': 3 } as React.CSSProperties}>
          {erreur}
        </p>
      )}

      {chargement && (
        <p className="lc-daily__loading" style={{ '--i': 3 } as React.CSSProperties}>
          Chargement de ta série…
        </p>
      )}

      {/* ---------------------- Déjà joué aujourd'hui ---------------------- */}
      {session && !chargement && !erreur && dejaJoue && (
        <div className="lc-daily__panel" style={{ '--i': 3 } as React.CSSProperties}>
          <p className="lc-daily__done">
            {dejaJoue.found
              ? `Trouvé en ${dejaJoue.attempts} essai${dejaJoue.attempts > 1 ? 's' : ''} · ${dejaJoue.score} points`
              : 'Pas trouvé aujourd’hui'}
          </p>
          <p>
            C’était <strong className="lc-daily__name">{player.name}</strong>. {player.hint}.
          </p>
          <p>Reviens demain pour prolonger ta série — le prochain tombe dans {countdown}.</p>
          <Button variant="secondary" onClick={onBack}>
            Retour à l’accueil
          </Button>
        </div>
      )}

      {/* --------------------------- Le plateau --------------------------- */}
      {jouable && (
        <div className="lc-board" style={{ '--i': 3 } as React.CSSProperties}>
          <div className="lc-board__grid">
            {lignes.map((ligne, r) => (
              <div
                key={r}
                className={`lc-board__row${
                  secousse && r === guesses.length ? ' is-shaking' : ''
                }`}
              >
                {Array.from({ length: answer.length }, (_, c) => {
                  const lettre = ligne.lettres[c] ?? '';
                  const etat = ligne.etats?.[c];

                  return (
                    <span
                      key={c}
                      className={`lc-cell${etat ? ` is-${etat}` : ''}${
                        lettre && !ligne.jouee ? ' is-typed' : ''
                      }`}
                      style={ligne.jouee ? ({ '--c': c } as React.CSSProperties) : undefined}
                    >
                      {lettre}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>

          {/* --------------------------- Fin de partie --------------------------- */}
          {fini && (
            <div className="lc-board__end">
              {status === 'won' ? (
                <>
                  <p className="lc-board__verdict is-won">
                    Trouvé en {guesses.length} essai{guesses.length > 1 ? 's' : ''} ·{' '}
                    {pointsFor(guesses.length, true)} points
                  </p>
                  <p className="lc-board__who">
                    <strong className="lc-daily__name">{player.name}</strong> — {player.hint}.
                  </p>
                </>
              ) : (
                <>
                  <p className="lc-board__verdict is-lost">Six essais, et pas de lucarne.</p>
                  <p className="lc-board__who">
                    C’était <strong className="lc-daily__name">{player.name}</strong> —{' '}
                    {player.hint}.
                  </p>
                </>
              )}
              {!session && (
                <p className="lc-board__invite">
                  Tu joues sans compte&nbsp;: ce résultat ne sera pas conservé.{' '}
                  <button type="button" onClick={onSignIn}>
                    Connecte-toi
                  </button>{' '}
                  pour garder ta série et tes statistiques.
                </p>
              )}

              <Button onClick={onBack}>Retour à l’accueil</Button>
            </div>
          )}

          {/* ----------------------------- Clavier ----------------------------- */}
          {!fini && (
            <div className="lc-keys">
              {KEYBOARD.map((rangee, i) => (
                <div key={i} className="lc-keys__row">
                  {i === 2 && (
                    <button
                      type="button"
                      className="lc-key lc-key--wide"
                      onClick={() => taper('ENTER')}
                    >
                      Entrée
                    </button>
                  )}

                  {[...rangee].map((lettre) => (
                    <button
                      key={lettre}
                      type="button"
                      className="lc-key"
                      onClick={() => taper(lettre)}
                    >
                      {lettre}
                    </button>
                  ))}

                  {i === 2 && (
                    <button
                      type="button"
                      className="lc-key lc-key--wide"
                      onClick={() => taper('BACK')}
                      aria-label="Effacer"
                    >
                      ←
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
