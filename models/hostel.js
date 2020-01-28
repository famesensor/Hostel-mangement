const mongoose = require('mongoose');

let hostelSchema = new mongoose.Schema({
    hostelname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Empty'
    },
    room: {
        type: Number,
        required: true
    },
    empty: {
        type: Number,
        required: true
    },
    map: {
        address: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Hostel = mongoose.model('hostel', hostelSchema);