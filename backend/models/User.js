const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
    
});
module.exports = mongoose.model('User', User);