const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// init app
const app = express();

const user = require('./routes/api/user');
const post = require('./routes/api/post');
const book = require('./routes/api/book');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/db.mongodb').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/user', user);
app.use('/api/posts', post);
app.use('/api/book', book);

// Set portnumber
const portnumber = process.env.PORT || 3000

// Start Server
app.listen(portnumber, function(){
    console.log('Server started port 3000');
});