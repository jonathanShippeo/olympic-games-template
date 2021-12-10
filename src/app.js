const express = require('express');
require('./database/mongodb');

const app = express();

app.use(express.json());

// Ajouter les routes via les routers
const sportRouter = require('./routers/sport.router');
app.use('/api/sports', sportRouter);

// ... Athlethes rooter...
const athletheRouter = require('./routers/athlete.router');
app.use('/api/athletes', athletheRouter);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port} 🚀`);
});

