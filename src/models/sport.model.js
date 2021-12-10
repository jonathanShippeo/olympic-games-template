'use strict';

const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    name: String,
    athletes: [String]

    // ... A COMPLETER ...
    // Exemple :
    // athletes : [{ type: Schema.Types.ObjectId, ref: 'Athlete' }]
});

const Sport = mongoose.model('sports', sportSchema);

module.exports = Sport;
