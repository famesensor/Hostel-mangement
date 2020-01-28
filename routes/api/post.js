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

router.get('/listhostel', (req, res) => {
    
});

router.get('/hostel/:id', (req, res) => {

});

module.exports = router;