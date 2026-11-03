import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { IconBack } from '../components/Icons';
import { Logo } from '../components/Logo';
import { DIFFICULTIES, THEME_LABELS, type ThemeId } from '../data/questions/types';
import { useAuth } from '../lib/auth-context';
import { computeStats, fetchMyGames, type QuizGameRow } from '../lib/games';
import './Profile.css';

function themeLabel(theme: string): string {
  if (theme === 'general') return 'Général';
  return THEME_LABELS[theme as ThemeId] ?? theme;
}

function difficultyLabel(id: string): string {
  return DIFFICULTIES.find((d) => d.id === id)?.label ?? id;
}

function dateLabel(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function Profile({ onBack }: { onBack: () => void }) {
  const { profile, session, signOut } = useAuth();
  const [games, setGames] = useState<QuizGameRow[] | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    let vivant = true;

    fetchMyGames(session.user.id)
      .then((rows) => vivant && setGames(rows))
      .catch((e) => vivant && setErreur(e instanceof Error ? e.message : String(e)));

    return () => {
      vivant = false;
    };
  }, [session]);

  const stats = computeStats(games ?? []);

  return (
    <div className="lc-profile lc-enter">
      <header className="lc-profile__bar" style={{ '--i': 0 } as React.CSSProperties}>
        <Logo size={38} withSignature={false} />
        <Button variant="secondary" className="lc-profile__back" onClick={onBack}>
          <IconBack size={18} />
          Retour
        </Button>
      </header>

      <p className="lc-profile__kicker" style={{ '--i': 1 } as React.CSSProperties}>
        Mon profil
      </p>
      <h1 className="lc-profile__name" style={{ '--i': 2 } as React.CSSProperties}>
        {profile?.pseudo ?? '…'}
      </h1>
      {profile && (
        <p className="lc-profile__since" style={{ '--i': 3 } as React.CSSProperties}>
          Inscrit depuis le{' '}
          {new Date(profile.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      )}

      <div className="lc-stats" style={{ '--i': 4 } as React.CSSProperties}>
        <div className="lc-stat">
          <span className="lc-label">Parties</span>
          <b>{stats.parties}</b>
        </div>
        <div className="lc-stat">
          <span className="lc-label">Points cumulés</span>
          <b>{stats.pointsTotal}</b>
        </div>
        <div className="lc-stat">
          <span className="lc-label">Meilleur score</span>
          <b>{stats.meilleurScore}</b>
        </div>
        <div className="lc-stat">
          <span className="lc-label">Réussite</span>
          <b>{stats.reussite}&nbsp;%</b>
        </div>
        <div className="lc-stat">
          <span className="lc-label">Sans faute</span>
          <b>{stats.sansFaute}</b>
        </div>
      </div>

      <h2 className="lc-label lc-profile__sub" style={{ '--i': 5 } as React.CSSProperties}>
        Historique des parties
      </h2>

      <div style={{ '--i': 6 } as React.CSSProperties}>
        {erreur && <p className="lc-profile__error">{erreur}</p>}

        {!erreur && games === null && <p className="lc-profile__empty">Chargement…</p>}

        {!erreur && games?.length === 0 && (
          <p className="lc-profile__empty">
            Aucune partie pour l’instant. Lance un quiz, il apparaîtra ici.
          </p>
        )}

        {!erreur && games && games.length > 0 && (
          <ol className="lc-history">
            {games.map((game) => (
              <li key={game.id} className="lc-history__row">
                <span className="lc-history__theme">{themeLabel(game.theme)}</span>
                <span className="lc-history__diff">{difficultyLabel(game.difficulty)}</span>
                <span className="lc-history__ratio">
                  {game.correct_count} / {game.total}
                </span>
                <span className="lc-history__date">{dateLabel(game.played_at)}</span>
                <span className="lc-history__score">{game.score} pts</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="lc-profile__out" style={{ '--i': 7 } as React.CSSProperties}>
        <Button variant="secondary" onClick={() => void signOut().then(onBack)}>
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}
