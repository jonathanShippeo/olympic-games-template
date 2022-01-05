'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sportSchema = new mongoose.Schema({
    name: String,
    athletes: [{ type: Schema.Types.ObjectId, ref: 'athlete' }]
});

const Sport = mongoose.model('Sports', sportSchema);

module.exports = Sport;