import type { Mode } from '../components/ModeCard';

/** Les six modes, dans l'ordre de la grille 3 × 2 de l'accueil. */
export const MODES: Mode[] = [
  {
    id: 'quiz',
    name: 'Quiz',
    description: 'Général ou thématique · 10 questions',
    icon: 'quiz',
  },
  {
    id: 'duel',
    name: 'Duel 1v1',
    description: 'Chacun son tour · mort subite en cas d’égalité',
    icon: 'duel',
  },
  {
    id: 'defi',
    name: 'Défi du jour',
    description: 'Un défi, une tentative, chaque jour',
    icon: 'defi',
  },
  {
    id: 'ballon-dor',
    name: 'Mon Ballon d’Or',
    description: 'Trois classements, un seul lauréat',
    icon: 'ballon-dor',
    gold: true,
  },
  {
    id: 'draft',
    name: 'Draft',
    description: 'Choisis ton schéma, compose ton onze',
    icon: 'draft',
  },
  {
    id: 'coupe',
    name: 'Coupe du monde',
    description: 'Mène ton équipe jusqu’à la finale',
    icon: 'coupe',
  },
];
