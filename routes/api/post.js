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
        .select({created:0, __v:0})
        .then((hostel) => {
            if (hostel.length > 0) {
                res.json(hostel)
            } else {
                res.json({ msg: 'No hostels found' })
            }
        })
        .catch((err) => {
            res.status(500).json({ errors : 'Internal Server Error'});
        });
});

// Hostel route by id  
router.get('/info/:id', (req, res) => {
    Hostel.findById(req.params.id)
        .select({created:0, __v:0})
        .then((hostel) => {
            if (hostel.length !== 0) {
                res.json(hostel);
            } else {
                res.json({ msg : 'No hostel found with that ID'});

            }
        })
        .catch((err) => {
            res.json({ msg : 'No hostel found with that ID'});
        });
});

// Hostel available route
router.get('/hostel-available', (req, res) => {
    Hostel.find({ status: 'available' })
        .select({created:0, __v:0})
        .then((hostel) => {
            if (hostel.length > 0) {
                res.json(hostel)
            } else {
                res.json({ msg : 'No, Hostel is empty '})
            }
        })
        .catch((err) => {
            res.status(500).json({ errors : 'Internal Server Error'});
        })
});

// Add Hostel (admin)
router.post('/insertHostel', passport.authenticate('jwt', { session: false}), (req, res) => {
    if (req.user.status === 'admin') {
        const newHostel = new Hostel({
            hostelname: req.body.hostelname,
            detail: {
                atmosphere: req.body.atmosphere,
                facilities: req.body.facilities
            },
            price: req.body.price,
            room: req.body.room,
            empty: req.body.empty,
            map: {
                address: req.body.address,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            }
        });
    
        newHostel.save()
            .then((hostel) => {
                res.json(hostel)
            })
            .catch((err) => {
                res.status(500).json({ errors : err});
            });
    } else {
        return res.status(403).json("Admin only");
    }
});

module.exports = router;