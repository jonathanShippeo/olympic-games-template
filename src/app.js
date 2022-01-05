const express = require('express');
const bodyParser= require('body-parser')
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// on supprime la ligne qui importait notre fichier json et celle du uuid ! Mongodb génére automatiquement les ids
//const { v4: uuidv4 } = require('uuid'); // pour générer un id : uuidv4();  ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const sportRouter = require('./routers/sport.router');
app.use('/api/sports', sportRouter);

const athleteRouter = require('./routers/athlete.router');
app.use('/api/athletes', athleteRouter);

app.get('/', (req, res) => {
    res.render('index', { name: 'CyberGames' });
});

app.get('/index', (req, res) => {
    res.render('index', { name: 'CyberGames' });
});

// Connexion à la base de données
require('./database/mongodb');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port} 🚀`);
});

app.set('view engine', 'hbs');
// on indique que nos vues se trouverons toujours dans le dossier views 
app.set('views', path.join(__dirname, 'views'

));
