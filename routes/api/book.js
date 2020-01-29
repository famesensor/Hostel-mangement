const express = require('express');
const router = express.Router();
const passport = require('passport');

// import User model
const User = require('../../models/user');
const Hostel = require('../../models/hostel');

// Test post
router.get('/test', (req, res) => {
    res.json({ msg : "Booking Works" })
});

// Booking route
router.post('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    let empty = 0;

    if (req.user.status === 'users') {
        Hostel.findById(req.params.id) 
            .then((hostel) => {
                empty = hostel.empty - 1;
                if (empty === 0 ) {
                    hostel.empty = empty;
                    hostel.status = 'unavailable';
                } else {
                    hostel.empty = empty;
                }
                hostel.save()
                    .then(() => {
                        User.findById(req.user.id)
                            .then((user) => {
                                newBook = ({
                                    name: {
                                        fname: req.body.fname,
                                        lname: req.body.lname
                                    },
                                    phone: req.body.phone,
                                    email: req.body.email,
                                    hostelBook: req.params.id,
                                    dateBook: {
                                        date: req.body.date,
                                        time: req.body.time
                                    },
                                    note: req.body.note
                                })

                                // Add to comment array
                                user.books.unshift(newBook);

                                user.save()
                                    .then((user) => {
                                        res.json(user);
                                    })
                                    .catch(err => {
                                        res.status(500).json({ errors : 'Internal Server Error'});
                                    });
                            })
                            .catch((err) => {
                                res.status(500).json({ errors : 'Internal Server Error'});
                            })
                    })
                    .catch((err) => {
                        res.status(500).json({ errors : 'Internal Server Error'});
                    })
            })
            .catch((err) => {
                res.status(500).json({ errors : 'Internal Server Error'});
            });
    } else {      
        return res.status(403).json({ msg : 'User only' });
    }
});

// Get My booking route
router.get('/mybooking', passport.authenticate('jwt', { session: false}), (req, res) => {
    User.findOne({ _id: req.user.id })
        .select({name:1, books:1, _id:0})
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(404).json({ Nouser: 'No user '});
        });
});

module.exports = router;