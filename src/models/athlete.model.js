'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const athleteSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    country: String

});

const Athlete = mongoose.model('Athletes', athleteSchema);

module.exports = Athlete;