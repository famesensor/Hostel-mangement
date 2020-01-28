const express = require('express');
const router = express.Router();
const passport = require('passport');

// import User model
const User = require('../../models/user');
const Hostel = require('../../models/hostel');

// Test post
router.get('/test', (req, res) => {
    res.json({ msg: "Posts Works" })
});

router.get('/', (req, res) => {

});

// List hostel route
router.get('/listhostel', (req, res) => {
    Hostel.find()
        .sort({ date: -1 })
        .then((hostel) => {
            res.json(hostel)
        })
        .catch((err) => {
            res.status(404).json({ nopostsfound: 'No hostels found' })
        });
});

// Hostel route  
router.get('/hostel/:id', (req, res) => {

});

// Hostel available route
router.get('/hostel-available', (req, res) => {

});

// Add Hostel (admin)
router.post('/insertHostel', passport.authenticate('jwt', { session: false}), (req, res) => {
    const newHostel = new Hostel({
        hostelname: req.body.hostelname,
        detail: req.body.detail,
        price: req.body.price,
        room: req.body.room,
        emtpy: req.body.emtpy
    });

    newPost.save().then((hostel) => {
        res.json(hostel)
    });
});

module.exports = router;