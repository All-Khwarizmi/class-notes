# TODO

## Tableau des Fonctionnalités et Améliorations

| Feature                              | Action                    | Statut       | Notes                                                               |
| ------------------------------------ | ------------------------- | ------------ | ------------------------------------------------------------------- |
| Compétences                          | Modifier                  | À faire      | Permettre la mise à jour des compétences existantes                 |
| Compétences                          | Supprimer                 | À faire      | Permettre la suppression de compétences                             |
| Evaluations                          | Assigner compétence       | À faire      | Permettre l'assignation de compétences a  une évaluation            |
| Classes                              | Ajouter matière et niveau | À faire      | Nécessaire pour personnaliser davantage les classes                 |
| Séquences                            | Ajouter catégorisation    | À envisager  | Structurer les séquences par niveau ou par matière                  |
| Programme                            | Créer                     | À planifier  | Introduire l'entité Programme pour standardiser les niveaux         |
| Notes                                | Uniformiser le design     | À faire      | Assurer une cohérence visuelle avec les autres features             |
| Contenu                              | Modifier la visibilité    | À faire      | Adapter la page visibilité sous forme de table avec le design système    |
| Internationalisation                 | Implémenter               | À faire      | Essentiel pour rendre l'application accessible globalement          |
| Dashboard                            | Créer des raccourcis      | À développer | Faciliter l'accès aux fonctionnalités fréquemment utilisées         |



## Tableau des Bugs et Corrections

| Bug Description                                                        | Statut     | Notes et Actions Suggérées                                                                             |
| ---------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| Erreur Client lors de navigation retour dans le navigateur             | À corriger | Problème avec la gestion des nodes. Vérifier les bibliothèques de chargement et les tabs server-side.  |
| Redirection incorrecte après création de séquence ou cours             | À corriger | Assurer la redirection avec les bons query parameters.                                                 |
| Mise à jour de la date de publication lors de changement de visibilité | À corriger | Automatiser la mise à jour de la date à chaque changement de visibilité.                               |
| Données périmées dans la page d'édition de séquence                    | À corriger | Envisager de déplacer la gestion des données client-side pour éviter l'affichage de données obsolètes. |
| Lenteur au chargement de la landing page                               | À corriger | Analyser les performances de chargement, optimiser les ressources.                                     |
| Image de fond trop petite sur appareils mobiles                        | À corriger | Ajuster les dimensions de l'image de fond pour une meilleure adaptation mobile.                        |
| Liens de l'éditeur peu visibles en mode clair                          | À corriger | Améliorer la visibilité des liens dans l'éditeur en ajustant les couleurs en fonction du thème.        |
