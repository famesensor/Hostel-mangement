const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../../config/db.mongodb');
const passport = require('passport');

// import input validation
const validateRegisterInput = require('../../validators/register');
const validateLoginInput = require('../../validators/login');

// import User model
const User = require('../../models/user');

// Test router
router.get('/test', (req, res) => {
    res.json({ msg : 'Test user system '});
});

// Register users
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                errors.username = `Username alrady exists`;
                return res.status(400).json(errors);
            }
            
            if (user) {
                errors.email = `Email already exists`;
                return res.status(400).json(errors);
            }

            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                name: {
                    fname: req.body.fname,
                    lname: req.body.lname
                },
                birth: req.body.birth
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => {
                            res.json(user);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

// Login user
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username })
        .then((user) => {
            // Check for user
            if (!user) {
                errors.username = `User not found`;
                return res.status(404).json(errors);
            }
            
            bcrypt.compare(password, user.password)
                .then((isMath) => {
                    if (isMath) {
                        // User Matched
                        const payload = { id: user.id, name: user.name, email: user.email}
                        
                        jwt.sign(payload, key.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                    } else {
                        errors.password = `Password incorrect`;
                        return res.status(400).json(errors);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        })
});

//  Return current user
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.user.name);
    res.json({ 
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        birth: req.user.birth
    })
});


module.exports = router;