const express = require('express');
const router = express.Router();
const passport = require('passport');

// import User model
const User = require('../../models/user');
const Hostel = require('../../models/hostel');

// Test post
router.get('/test', (req, res) => {
    res.json({ msg: "Booking Works" })
});

// Booking route
router.post('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Hostel.findOne({ _id: id })
        .then((hostel) => {
            
        })
        .catch((err) => {
            res.status(404).json({ nohostel: 'No hostel found with that ID' });
        })
});

// Get My booking route
router.get('/mybooking', passport.authenticate('jwt', { session: false}), (req, res) => {
    User.findOne({ username: req.user.username })
        .select({name:1, book:1, _id:0})
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(404).json({ Nouser: 'No user '});
        });
});

module.exports = router;