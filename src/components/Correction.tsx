import { IconCheck, IconCross } from './Icons';
import { QUESTION_TYPES } from '../data/questions/types';
import type { Answered } from '../game/quiz';
import './Correction.css';

const LETTERS = ['A', 'B', 'C', 'D'];

/**
 * La correction question par question, affichée en fin de partie : ta réponse
 * barrée quand elle était fausse, la bonne en vert, et l'explication.
 */
export function Correction({ answers }: { answers: readonly Answered[] }) {
  return (
    <ol className="lc-corr-list">
      {answers.map((answer, i) => {
        const { question, chosen, correct } = answer;

        return (
          <li key={question.id} className={`lc-corr${correct ? ' is-right' : ' is-wrong'}`}>
            <span className="lc-corr__mark" aria-hidden="true">
              {correct ? <IconCheck size={22} /> : <IconCross size={22} />}
            </span>

            <div className="lc-corr__body">
              <p className="lc-corr__meta">
                Question {i + 1}
                <span className="lc-corr__sep">·</span>
                {QUESTION_TYPES[question.type]}
              </p>
              <p className="lc-corr__prompt">{question.prompt}</p>

              <p className="lc-corr__answers">
                {!correct && (
                  <span className="lc-corr__yours">
                    {chosen === null ? (
                      'Pas de réponse'
                    ) : (
                      <>
                        {LETTERS[chosen]} · {question.choices[chosen]}
                      </>
                    )}
                  </span>
                )}
                <span className="lc-corr__good">
                  {LETTERS[question.answer]} · {question.choices[question.answer]}
                </span>
              </p>

              <p className="lc-corr__explain">{question.explanation}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
