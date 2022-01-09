const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));

const sportApiRouter = require('./routers/api/sport.api.router');
const athleteApiRouter = require('./routers/api/athlete.api.router');

const athletesPageRouter = require('./routers/front/athletes.page.router');
const sportsPageRouter = require('./routers/front/sports.page.router');


app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));


app.use('/api/sports', sportApiRouter);
app.use('/api/athletes', athleteApiRouter);

//VIEWS Front end
app.get('/', (req, res) => {
    res.render('index', { name: 'CyberGames' });
});

//athletes pages
app.use('/athletes',athletesPageRouter);
//sports pages
app.use('/sports',sportsPageRouter);

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
