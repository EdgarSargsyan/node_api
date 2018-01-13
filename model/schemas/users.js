const db = require('../db.js');
const UsersSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z ]+/
    },
    surname: {
        type: String,
        required: true,
        match: /^[a-zA-Z ]+/
    },
    birthdate: {
        type: Date,
        default: new Date()
    },
    address1: {
        type: String,
        match: /^[a-zA-Z0-9\/ ]+/
    },
    address2: {
        type: String,
        match: /^[a-zA-Z0-9\/ ]+/
    },
    country: {
        type: String,
        match: /^[a-zA-Z ]+/
    },
    city: {
        type: String,
        match: /^[a-zA-Z ]+/
    },
    postal_code:{
        type: Number,
        match: /^[0-9]+/
    }

});

const users = db.model('user', UsersSchema);

module.exports = users;