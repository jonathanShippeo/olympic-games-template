const mongoose = require('mongoose');

require('dotenv').config();

//mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const uri = process.env.MONGODB_URL;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function() {
    console.log('Connected to the database! ✅');
});
