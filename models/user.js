const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 6,
        max: 30,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        max: 30,
        required: true
    },
    email: {
            type: String,
            required: true
    },
    name: {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        }
    },
    birth: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default:  Date.now
    }
});

module.exports = User = mongoose.model('users', userSchema);