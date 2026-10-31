import { useEffect, useState } from 'react';
import { IconBack, IconCheck, IconCross } from '../components/Icons';
import { QUESTION_TYPES, THEME_LABELS } from '../data/questions/types';
import { SECONDS_PER_QUESTION, type Answered, type QuizSetup } from '../game/quiz';
import { useQuizGame } from '../game/useQuizGame';
import './QuizPlay.css';

const LETTERS = ['A', 'B', 'C', 'D'];

type Props = {
  setup: QuizSetup;
  onFinish: (answers: Answered[]) => void;
  onQuit: () => void;
};

export function QuizPlay({ setup, onFinish, onQuit }: Props) {
  const game = useQuizGame(setup);
  const { question, status, chosen, index, total, score, remainingMs, secondsLeft } = game;

  const revealed = status === 'revealed';
  const wasRight = revealed && chosen !== null && chosen === question.answer;
  const wasWrong = revealed && !wasRight;

  // Le score monte avec un temps de retard, pour que le « +3 » le précède.
  const [shownScore, setShownScore] = useState(score);
  useEffect(() => {
    if (score === shownScore) return;
    const id = window.setTimeout(() => setShownScore(score), 300);
    return () => window.clearTimeout(id);
  }, [score, shownScore]);

  useEffect(() => {
    if (status === 'finished') onFinish(game.answers);
  }, [status, game.answers, onFinish]);

  if (status === 'finished') return null;

  const themeLabel = setup.theme === 'general' ? 'Général' : THEME_LABELS[setup.theme];
  const progress = (remainingMs / (SECONDS_PER_QUESTION * 1000)) * 100;

  return (
    <div className="lc-play">
      {wasRight && <div className="lc-play__flash" aria-hidden="true" />}
      {wasWrong && <div className="lc-play__alarm" aria-hidden="true" />}

      <header className="lc-play__top">
        <span className="lc-play__mode">Quiz · {themeLabel}</span>

        <span className="lc-play__score">
          <span className={`lc-play__score-n${shownScore !== score ? '' : ' is-pulse'}`}>
            Score {shownScore}
          </span>
          {wasRight && <span className="lc-play__plus">+3</span>}
        </span>

        <button type="button" className="lc-play__quit" onClick={onQuit} aria-label="Quitter la partie">
          <IconBack size={18} />
          <span>Quitter</span>
        </button>
      </header>

      <div className="lc-play__timer" aria-hidden="true">
        <i style={{ transform: `scaleX(${Math.max(0, progress) / 100})` }} />
      </div>

      <div className="lc-play__body" key={index}>
        <p className="lc-play__meta" style={{ '--i': 0 } as React.CSSProperties}>
          Question {index + 1} / {total}
          <span className="lc-play__sep">·</span>
          <span className={secondsLeft <= 5 ? 'lc-play__clock is-low' : 'lc-play__clock'}>
            00:{String(secondsLeft).padStart(2, '0')}
          </span>
          <span className="lc-play__sep">·</span>
          <span className="lc-play__kind">{QUESTION_TYPES[question.type]}</span>
        </p>

        <h1 className="lc-play__question" style={{ '--i': 1 } as React.CSSProperties}>
          {question.prompt}
        </h1>

        <div
          className={`lc-play__answers${question.choices.length === 2 ? ' is-duo' : ''}`}
        >
          {question.choices.map((choice, i) => {
            const isPicked = chosen === i;
            const isRight = i === question.answer;

            let state = '';
            if (revealed) {
              if (isPicked && isRight) state = ' is-right';
              else if (isPicked) state = ' is-wrong';
              else if (isRight) state = ' is-shown';
              else state = ' is-dim';
            }

            return (
              <button
                key={choice}
                type="button"
                className={`lc-play__answer${state}`}
                style={{ '--i': i + 2 } as React.CSSProperties}
                disabled={revealed}
                onClick={() => game.answer(i)}
              >
                <span className="lc-play__letter">{LETTERS[i]}</span>
                <span className="lc-play__text">{choice}</span>
                <span className="lc-play__mark" aria-hidden="true">
                  {revealed && isPicked && isRight && <IconCheck size={26} />}
                  {revealed && isPicked && !isRight && <IconCross size={26} />}
                  {revealed && !isPicked && isRight && <IconCheck size={26} />}
                </span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <p className="lc-play__explain">
            {chosen === null && <strong>Temps écoulé. </strong>}
            {question.explanation}
          </p>
        )}
      </div>
    </div>
  );
}
