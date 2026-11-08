# SignalDesk — plan produit, technique et design

## Intention

SignalDesk est un workspace SaaS open source pour transformer des signaux dispersés en décisions traçables. Le premier livrable doit être crédible dès l'ouverture : une page publique qui explique le produit et une application de démonstration riche, navigable sans compte, avec des données réalistes et des interactions utiles. Le code doit rester lisible, documenté et prêt à évoluer vers la persistance gérée, l'authentification et les fichiers.

## Produit livré

- Landing publique : positionnement, cas d'usage, principes de traçabilité, aperçu de l'espace de travail et appel à contribuer.
- Workspace analyste : navigation latérale, synthèse des dossiers, signaux prioritaires, activité récente et raccourcis.
- Dossiers : liste filtrable, détail d'un dossier, statut, confiance, tags, responsables, chronologie et sources liées.
- Bibliothèque de sources : recherche, filtres, typologie, provenance, fraîcheur et rattachement aux dossiers.
- Inbox de signaux : qualification impact/urgence, conversion en élément de dossier et suivi du traitement.
- Canvas : lecture structurée d'une hypothèse avec preuves, contre-arguments et conclusion.
- Comparaison : matrice de scénarios avec critères pondérés et scores visuels.
- Brief : aperçu d'une note décisionnelle imprimable et action de génération locale.
- Recherche globale et commandes rapides dans l'interface.
- Données de démonstration cohérentes, actions d'interface non destructives, responsive desktop/mobile.
- Documentation open source : README, CONTRIBUTING, LICENSE et architecture.

## Approche technique

- React + TypeScript + Vite côté interface, Wouter pour les routes et composants Radix existants quand ils accélèrent une interaction.
- Express/tRPC/Drizzle déjà préparés par le template. La démo utilise un état local typé et des données seed afin d'être immédiatement exploitable sans compte ; le schéma relationnel et les points d'extension restent documentés pour une prochaine itération.
- Aucun secret ni service externe requis pour la démonstration. Les mutations de l'interface restent en mémoire et donnent un retour explicite.
- `public/manus-routes.json` décrit toutes les routes applicatives.
- Build serveur standard `pnpm build`, healthcheck existant `/api/health`.

## Structure principale

- `client/src/pages/` : landing, workspace et pages fonctionnelles.
- `client/src/components/` : shell, cartes, graphiques simples, badges et commandes.
- `client/src/lib/` : données seed, types, formatage et helpers.
- `server/` : runtime Express/tRPC déjà fourni, à enrichir lors de la phase persistance.
- `drizzle/` : schéma utilisateur fourni et extensions prévues pour les entités métier.
- `public/` : manifeste de routes et fichiers statiques.
- `README.md`, `CONTRIBUTING.md`, `LICENSE` : documentation de dépôt public.

## Direction artistique retenue

### Styles envisagés

- **Bureau éditorial sombre** — 0,07 : interface de renseignement calme, dense, presque newsroom.
- **Atelier cartographique** — 0,06 : cartes, connexions et couches d'information avec une énergie plus exploratoire.
- **Terminal solaire** — 0,08 : contraste encre/ivoire, accent citron et micro-typographie technique.

### Choix : Terminal solaire

- **Mouvement** : terminal éditorial / Swiss International Style réchauffé par une palette solaire, pas un dashboard SaaS bleu générique.
- **Principes** : hiérarchie typographique nette, densité contrôlée, confiance par la preuve, interactions directes et silencieuses.
- **Couleurs** : fond encre `#101413`, surfaces graphite, texte ivoire et jaune-chartreuse `#D8F36B` comme signal propriétaire. Le vert ne sert qu'aux états confirmés ; ambre et corail qualifient le risque.
- **Mise en page** : shell à rail latéral fixe, contenu asymétrique avec une colonne de contexte et une scène principale ; les pages publiques utilisent un grand cadrage éditorial et des panneaux décalés plutôt qu'une grille centrée uniforme.
- **Motifs signature** : jauges circulaires minimalistes, trames de points très fines, onglets numérotés et ligne de statut monospace.
- **Interactions** : cliquer doit révéler un état ou un contexte, jamais ouvrir une cascade de modales. Les filtres et tabs changent la densité sur place ; les actions confirment par toasts et microcopie.
- **Animation** : entrées en fondu + translation de 8px, pulse discret sur les signaux non lus, aucune animation décorative permanente.
- **Typographie** : `Space Grotesk` pour les titres et `IBM Plex Mono` pour les labels, timestamps et métriques. Corps en `Inter` système avec une taille confortable.
- **Essence de marque** : "Turn noise into a defensible point of view." Curieux, rigoureux, ouvert.
- **Voix** : factuelle, confiante, jamais corporate. Exemples : "Every claim needs a trail." / "Make the next call with the evidence in view."
- **Wordmark** : un point solaire dans un crochet ouvert, comme un curseur qui devient boussole ; le mot-symbole garde des ligatures serrées et un détail chartreuse sur le point.
- **Couleur propriétaire** : jaune-chartreuse `#D8F36B`.
