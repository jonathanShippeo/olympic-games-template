// Connexion à la base de données
require('./database/mongodb');

//Variables / bibliothèques
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Ajouter les routes via les routers
//const sportRouter = require('./routers/sport.router');

//app.use('/api', sportRouter);
// ... A COMPLETER ...

app.set('view engine', 'hbs');
// on indique que nos vues se trouverons toujours dans le dossier views 
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { name: 'TweetJS' });
});
 



app.post('/tweets', (req, res) => {
    const body = req.body;
    tweets.push(body);
    res.redirect('/tweets');
});

const sportRouter = require('./routers/sport.router');
app.use('/api/sports', sportRouter);

// ... Athlethes rooter...
const athletheRouter = require('./routers/athlete.router');
app.use('/api/athletes', athletheRouter);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port} 🚀`);
});

