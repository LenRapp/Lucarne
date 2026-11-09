import { Button } from '../components/Button';
import { Correction } from '../components/Correction';
import { POINTS_PER_CORRECT, type Answered, correctCount, verdict } from '../game/quiz';
import './QuizResult.css';

type Props = {
  answers: Answered[];
  onReplay: () => void;
  onHome: () => void;
};

export function QuizResult({ answers, onReplay, onHome }: Props) {
  const right = correctCount(answers);
  const score = right * POINTS_PER_CORRECT;

  return (
    <div className="lc-result lc-enter">
      <p className="lc-result__kicker" style={{ '--i': 0 } as React.CSSProperties}>
        Fin de partie
      </p>

      <div className="lc-result__head" style={{ '--i': 1 } as React.CSSProperties}>
        <div className="lc-result__score">
          <span className="lc-result__points">{score}</span>
          <span className="lc-result__unit">points</span>
        </div>
        <div className="lc-result__detail">
          <p className="lc-result__ratio">
            {right} bonne{right > 1 ? 's' : ''} réponse{right > 1 ? 's' : ''} sur{' '}
            {answers.length}
          </p>
          <p className="lc-result__verdict">{verdict(right, answers.length)}</p>
        </div>
      </div>

      <div className="lc-result__actions" style={{ '--i': 2 } as React.CSSProperties}>
        <Button onClick={onReplay}>Rejouer</Button>
        <Button variant="secondary" onClick={onHome}>
          Accueil
        </Button>
      </div>

      <h2 className="lc-label lc-result__sub" style={{ '--i': 3 } as React.CSSProperties}>
        La correction
      </h2>

      <div style={{ '--i': 4 } as React.CSSProperties}>
        <Correction answers={answers} />
      </div>
    </div>
  );
}
