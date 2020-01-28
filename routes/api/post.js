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

// router.get('/', (req, res) => {

// });

// List hostel route
router.get('/listhostel', (req, res) => {
    Hostel.find()
        .sort({ date: -1 })
        .select({_id:0, created:0, __v:0})
        .then((hostel) => {
            res.json(hostel)
        })
        .catch((err) => {
            res.status(404).json({ nopostsfound: 'No hostels found' })
        });
});

// Hostel route by id  
router.get('/hostel/:id', (req, res) => {
    Hostel.findById(req.params.id)
        .select({_id:0, created:0, __v:0})
        .then((hostel) => {
            res.json(hostel);
        })
        .catch((err) => {
            res.status(404).json({ nohostel: 'No hostel found with that ID'});
        });
});

// Hostel available route
router.get('/hostel-available', (req, res) => {
    Hostel.find({ status: 'Empty' })
        .select({_id:0, created:0, __v:0})
        .then((hostel) => {
            if (hostel.length > 0) {
                res.json(hostel)
            } else {
                res.json({ Noone : 'No, Hostel is empty '})
            }
        })
        .catch((err) => {
            console.log(err);
        })
});

// Add Hostel (admin)
router.post('/insertHostel', passport.authenticate('jwt', { session: false}), (req, res) => {
    if (req.user.status === 'admin') {
        const newHostel = new Hostel({
            hostelname: req.body.hostelname,
            detail: req.body.detail,
            price: req.body.price,
            room: req.body.room,
            empty: req.body.empty,
            map: {
                address: req.body.address,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            }
        });
    
        newHostel.save().then((hostel) => {
            res.json(hostel)
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        return res.status(400).json("Admin only");
    }
});

module.exports = router;