# Lucarne

Mini application web de football, installable sur le bureau. Quiz, duel 1 contre 1,
défi du jour, Mon Ballon d'Or, draft et simulation de Coupe du monde.

Le nom désigne le coin supérieur du but — « en plein dans le coin ».

## Démarrer

```bash
npm install
npm run dev
```

L'application tourne alors sur <http://localhost:5173>.

Ajouter `?splash` à l'adresse rejoue la séquence de lancement du logo, qui ne se
joue normalement qu'au premier lancement.

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Vérification des types et compilation dans `dist/` |
| `npm run preview` | Sert la version compilée |
| `npm run lint` | Analyse statique |

## Direction artistique

Le design est figé par le document `Lucarne_prompt_design_animations.md` et les
maquettes `Lucarne_design_valide.pdf`, validés le 31 octobre 2026. Toute
l'interface en découle : ambiance de soir de match, et un second thème noir et or
réservé au mode Mon Ballon d'Or.

Les deux thèmes partagent les mêmes rôles de variables CSS, définis dans
`src/styles/tokens.css`. Changer de thème revient à poser `data-theme="stade"`
ou `data-theme="ballon-dor"` sur la page : aucun composant n'a besoin d'être
modifié.

## Organisation

```
src/
  components/   Logo, boutons, badges, icônes, cartes de mode, séquence de lancement
  screens/      Un dossier par écran de jeu
  data/         Données statiques (modes, questions, joueurs)
  hooks/        Petits utilitaires React
  styles/       Variables des thèmes et socle commun
```

## Avancement

- [x] Socle : thèmes, polices, logo animé, composants de base, accueil
- [ ] Quiz général et thématique
- [ ] Comptes, profil et sauvegarde
- [ ] Défi du jour
- [ ] Mon Ballon d'Or
- [ ] Draft
- [ ] Simulation de Coupe du monde
- [ ] Duel 1 contre 1 et mort subite
- [ ] Classement, badges et finition mobile
