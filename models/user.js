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
    book: [{
        hostelBook: {
            type: Schema.Types.ObjectId,
            ref: 'hostel'
        },
        dateBook: {
            date: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            }
        },
        note: {
            type: String
        }
    }],
    status: {
        type: String,
        default: 'users'
    },
    created: {
        type: Date,
        default:  Date.now
    }
});

module.exports = User = mongoose.model('users', userSchema);