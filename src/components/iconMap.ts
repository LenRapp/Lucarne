import type { ReactNode } from 'react';
import {
  IconBallonDor,
  IconClassement,
  IconCoupe,
  IconDefi,
  IconDraft,
  IconProfil,
  IconQuiz,
  IconDuel,
  type IconName,
} from './Icons';

/** Table des icônes, pour les composants qui en choisissent une par son nom. */
export const ICONS: Record<IconName, (props: { size?: number }) => ReactNode> = {
  quiz: IconQuiz,
  duel: IconDuel,
  defi: IconDefi,
  'ballon-dor': IconBallonDor,
  draft: IconDraft,
  coupe: IconCoupe,
  classement: IconClassement,
  profil: IconProfil,
};
