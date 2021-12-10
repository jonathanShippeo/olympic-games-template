'use strict';

const mongoose = require('mongoose');

const athleteSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    country: String
     //TODO
    /* 
    gender: Gender (FEMALE ou MALE)
    country: Country (code ISO 3166-1 alpha 2, par exemple : AU, BR, CN, FR, MA, RU, US, etc.)

    */
});

const Athlete = mongoose.model('athletes', athleteSchema);

module.exports = Athlete;
