const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals')
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const morgan = require('morgan');
const express = require('express');

module.exports = function(app) {
    //Routes
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    //Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('tiny'));

    app.use(error); //only invoked when next() is called
    //express-async-errors monkey-patches our code and wraps all requests
    //in code similar to what we have in middleware/async.js
}