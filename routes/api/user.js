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

    User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] })
        .then((user) => {
            if (user) {
                if (user.username === req.body.username) {
                    errors.username = `Username alrady exists`;
                    errors.errors = 1; 
                    return res.status(200).json(errors);
                } else {
                    errors.email = `Email alrady exists`;
                    errors.errors = 1; 
                    return res.status(200).json(errors);
                }    
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
                            console.log(err)
                        })
                });
            });
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ errors : 'Internal Server Error'});
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
                errors.errors = 1;
                return res.json(errors);
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
                        return res.json(errors);
                    }
                })
                .catch((err) => {
                    res.status(500).json({ errors : 'Internal Server Error'});
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
        birth: req.user.birth,
        status: req.user.status
    })
});


module.exports = router;