import { useCallback, useEffect, useRef, useState } from 'react';
import type { Question } from '../data/questions/types';
import {
  SECONDS_PER_QUESTION,
  POINTS_PER_CORRECT,
  type Answered,
  isCorrect,
} from './quiz';

/** `playing` : le chrono tourne. `revealed` : la réponse est affichée. */
export type GameStatus = 'playing' | 'revealed' | 'finished';

/** Temps d'affichage de la correction avant de passer à la question suivante. */
const REVEAL_MS = 1800;

/**
 * Déroule une partie sur une liste de questions déjà tirée. Le tirage est
 * décidé ailleurs : au hasard pour le quiz, à partir de la date pour le défi
 * du jour. Le moteur, lui, est le même.
 */
export function useQuizGame(questions: readonly Question[]) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answered[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [remainingMs, setRemainingMs] = useState(SECONDS_PER_QUESTION * 1000);

  /**
   * Le statut est aussi tenu dans une référence : c'est lui qui garde la porte.
   * Un garde posé dans une mise à jour d'état serait joué deux fois en mode
   * strict, et la réponse serait comptée en double.
   */
  const statusRef = useRef<GameStatus>('playing');

  const question = questions[index];
  const score = answers.filter((a) => a.correct).length * POINTS_PER_CORRECT;

  /** Enregistre la réponse et bascule en correction. `null` = chrono écoulé. */
  const answer = useCallback(
    (choice: number | null) => {
      if (statusRef.current !== 'playing') return;
      statusRef.current = 'revealed';

      setChosen(choice);
      setAnswers((previous) => [
        ...previous,
        { question, chosen: choice, correct: isCorrect(question, choice) },
      ]);
      setStatus('revealed');
    },
    [question],
  );

  /** Passe à la question suivante, ou termine la partie. */
  const next = useCallback(() => {
    if (statusRef.current !== 'revealed') return;

    if (index + 1 >= questions.length) {
      statusRef.current = 'finished';
      setStatus('finished');
      return;
    }

    statusRef.current = 'playing';
    setIndex((i) => i + 1);
    setChosen(null);
    setRemainingMs(SECONDS_PER_QUESTION * 1000);
    setStatus('playing');
  }, [index, questions.length]);

  // Le chrono de la question en cours.
  const answerRef = useRef(answer);
  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);

  useEffect(() => {
    if (status !== 'playing') return;

    const deadline = Date.now() + SECONDS_PER_QUESTION * 1000;
    let frame = 0;

    const tick = () => {
      const left = Math.max(0, deadline - Date.now());
      setRemainingMs(left);
      if (left === 0) {
        answerRef.current(null);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index, status]);

  // L'enchaînement automatique après la correction.
  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  useEffect(() => {
    if (status !== 'revealed') return;
    const id = window.setTimeout(() => nextRef.current(), REVEAL_MS);
    return () => window.clearTimeout(id);
  }, [status, index]);

  return {
    question,
    index,
    total: questions.length,
    answers,
    chosen,
    status,
    score,
    remainingMs,
    secondsLeft: Math.ceil(remainingMs / 1000),
    answer,
    next,
  };
}
