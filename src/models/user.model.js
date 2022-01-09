'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let validateEmail = function(login) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(login)
};

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: String

});

const User = mongoose.model('Users', userSchema);

module.exports = User;