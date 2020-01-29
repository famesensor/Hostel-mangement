const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

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
    books: [{
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
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        hostelBook: {
            type: ObjectId,
            ref: 'hostels'
        },
        dateBook: {
            datein: {
                type: String,
                required: true
            },
            dateout: {
                type: String,
                required: true
            },
            checkin: {
                type: String,
                required: true
            },
            checkout: {
                type: String,
                required: true
            }
        },
        note: {
            type: String
        },
        created: {
            type: Date,
            default: Date.now
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