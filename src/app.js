const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));

//Api Routers
const sportApiRouter = require('./routers/api/sport.api.router');
const athleteApiRouter = require('./routers/api/athlete.api.router');
const userApiRouter = require('./routers/api/user.api.router');

//Front request Routers
const athletesPageRouter = require('./routers/front/athletes.page.router');
const sportsPageRouter = require('./routers/front/sports.page.router');
const usersPageRouter = require('./routers/front/users.page.router');



app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));


app.post('/webhook',function(request, response) {
    const action = request.body.action;
    console.log(request.body.operation);
  console.log(request.body.action);
    switch (action) {
        case 'sports':
          response.json(
            { text: 'Tu as choisi de voir les sports 🏀' }
          );
          break;
          case 'addSport':
            response.json(
              { text: 'Tu as bien AJOUTE ton sports 🏀🏀🏀' }
            );
            break;
  
      case 'athletes':
        response.json(
          { text: 'Tu as choisi de voir les athlètes 🏋🏻‍♀️' }
        );
        break;
  
      default:
        response.json(
          { text: 'Je ne suis pas sûr d\'avoir la réponse...'});
    }
  });



app.use('/api/sports', sportApiRouter);
app.use('/api/athletes', athleteApiRouter);
app.use('/api/users',userApiRouter);

//VIEWS Front end
app.get('/', (req, res) => {
    res.render('index', { name: 'CyberGames' });
});

//athletes pages
app.use('/athletes',athletesPageRouter);
//sports pages
app.use('/sports',sportsPageRouter);
//users pages
app.use('/users',usersPageRouter);

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
