# Modèle de structure pour le projet Node.js/Express/MongoDB du TP1

## Installation rapide pour le projet

```shell
git clone https://github.com/jonathanShippeo/olympic-games-template.git
cd olympic-games-template
export MONGODB_URL=<A COMPLETER>
npm install
npm start
```

## Exemple d'appel de l'API REST

Lister les sports :

```shell
curl http://localhost:3000/api/sports -H 'Content-Type: application/json'
```

![image](https://user-images.githubusercontent.com/30086549/148685160-3fb5beb0-5610-4cc3-a3c7-c4d652ccd52d.png)

# TODO pour le TP 1

## API REST

### Points de terminaison Sports

- ✅ Endpoint Créer un sport : `POST /api/sports`
- ✅ Endpoint Lister les sports : `GET /api/sports` (déjà fourni dans le squelette du projet)
- ✅ Endpoint Consulter les athlètes d'un sport : `GET /api/sports/{sportId}/athletes`
- ✅ Endpoint Ajouter un athlète dans un sport : `POST /api/sports/{sportId}/athletes/{athleteId}`

### Points de terminaison Athlètes

- ✅ Endpoint Créer un athlète : `POST /api/athletes`
- ✅ Endpoint Lister les athlètes : `GET /api/athletes`
- ✅ Endpoint Consulter les sports d'un athlète : `GET /api/athletes/{athleteId}/sports`

### Points de terminaison Utilisateurs administrateurs (optionnel)

- ✅ Endpoint Créer un utilisateur : `POST /api/users`
- ✅ Endpoint Mettre à jour un utilisateur : `PUT /api/users/{userId}`
- ✅ Endpoint Lister les utilisateurs : `GET /api/users`
- ✅ Endpoint Consulter un utilisateur : `GET /api/users/{userId}`

## Interface Web

![image](https://user-images.githubusercontent.com/30086549/148684975-205e0c8e-f828-4319-b022-fb1b2cd7e8e0.png)



```shell
    http://localhost:3000/ 
```

### Pages Web Sports/Athlètes

- ✅ Page Web Lister les sports
- ✅ Page Web Lister les athlètes
- ✅ Page Web Créer un sport (formulaire)
- ✅ Page Web Créer un athlète (formulaire)

![image](https://user-images.githubusercontent.com/30086549/148685023-9bcfd0f9-dc17-48e6-bce1-be7518278be9.png)

![image](https://user-images.githubusercontent.com/30086549/148685058-165c18c5-e567-41ea-9e37-e6d241839974.png)


### Autres pages Web Sports/Athlètes (optionnel)

- ✅ Page Web ou fonctionnalité Supprimer un sport
- ✅ Page Web ou fonctionnalité Supprimer un athlète
- [ ] Page Web Modifier un sport (formulaire)
- [ ] Page Web Modifier un athlète (formulaire)

### Pages Web Utilisateurs (optionnel)

- [ ] Page Web Lister les utilisateurs
- [ ] Page Web Créer un utilisateur (formulaire)
- [ ] Page Web ou fonctionnalité Supprimer un utilisateur
- [ ] Page Web Modifier un utilisateur (formulaire)

### Autres options avancées (optionnel)

- [ ] Authenfication sur les API REST
- [ ] Page Web de connexion avec login/mot de passe utilisateur

## Rendu attendu

- ✅ Code source sur un repo Git (sans le dossier node_modules 🙏)
- ✅ `README.md`
  - ✅ Instructions pour installer le projet (`git clone`, `npm install`, `npm start`, éventuels exemples de commande `curl`, ...)
  - [x] Checklist des API et des fonctionnalités Web avec un statut des tests (OK ✅ ou KO ❌)