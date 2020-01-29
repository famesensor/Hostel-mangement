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
    let empty = 0;
    let status = '';

    if (req.user.status === 'users') {
        // console.log(req.body.date);
        // console.log(req.body.time);
        Hostel.findOne({ _id: req.params.id })
            .then((hostel) => {
                if (hostel.status != 'Full' && hostel.empty != 0) {
                    // console.log('test')
                    newBook = new User({
                        book: {
                            hostelBook: req.params.id,
                            dateBook: {
                                date: req.body.date,
                                time: req.body.time
                            },
                        note: req.body.note
                        }
                    });
                    
                    empty = hostel.empty - 1;
                    if (empty === 0) {
                        newHostel = new Hostel({
                            empty: empty,
                            status: 'Full'
                        });
                    } else {
                        newHostel = new Hostel({
                            empty: empty
                        });
                    }

                    hostel.save()
                        .then(hostel => res.json(hostel))
                        .catch((err) => console.log(err));
                    User.findById(req.user.id)
                        .then((user) => {
                            // Add to comments array
                            user.book.unshift(newBook);

                            user.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    
                }
            })
            .catch((err) => {
                res.status(404).json({ nohostel: 'No hostel found with that ID' });
            })
    } else {
        return res.status(403).json({ errors: 'User only' });
    }
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