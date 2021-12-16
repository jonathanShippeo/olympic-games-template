// Connexion à la base de données
require('./database/mongodb');

//Variables / bibliothèques
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');

// on supprime la ligne qui importait notre fichier json et celle du uuid ! Mongodb génére automatiquement les ids
//const { v4: uuidv4 } = require('uuid'); // pour générer un id : uuidv4();  ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
//app.use(express.json());
const Athlete = require('./models/athlete.model');

// Les routes /sport et /athlete sont modifié pour récupérer tous les sports et athletes
// ... ROUTE sport.router ...
const sportRouter = require('./routers/sport.router');
app.use('/views/sports', sportRouter);

// ... ROUTE athlete.router ...
const athletheRouter = require('./routers/athlete.router');
app.use('/views/athletes', athletheRouter);

app.set('view engine', 'hbs');
// on indique que nos vues se trouverons toujours dans le dossier views 
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { name: 'athletes' });
});

/*
// on en profite pour sort par la date de création en descendant (-1) !
app.get('/api/athletes', async (req, res) => {
    const athletes = await Athlete.find({}).sort({ createdAt: -1 });
    res.render('athletes', { athletes });
});

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
// Ajouter les routes via les routers
//const sportRouter = require('./routers/sport.router');

//app.use('/api', sportRouter);






/*
// Renvoi sur la page de athletes
app.post('/athletes', (req, res) => {
    const body = req.body;
    athletes.push(body);
    res.redirect('/athletes');
});


app.post('/athletes', (req, res) => {
    const body = req.body;
    athletes.push(body);
    res.redirect('/athletes');
});

app.get('/athletes/:id', function(req, res) {
    const id = req.params.id;
    
    const athlete = athletes.find((elem) => {
        return elem.id === id; 
    });

    res.render('athlete', { athlete });
});
*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port} 🚀`);
});

