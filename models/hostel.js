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
        default: "Empty"
    },
    map: {
        type: String,
        required: true
    },
    // book: [{
    //     date: {
    //         type: String,
    //         required: true
    //     },
    //     bookingBy: {
    //         type: ObjectId,
    //         ref: "users"
    //     }
    // }],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Hostel = mongoose.model('hostel', hostelSchema);