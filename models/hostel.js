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
        atmosphere: {
            type: String,
        },
        facilities: {
            type: String
        }
    },
    status: {
        type: String,
        default: 'available'
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