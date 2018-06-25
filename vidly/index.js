require('express-async-errors'); //monkey patches our routes, wraps in try/catch, uses last middleware
//in pipeline to handle exceptions

const winston = require('winston');
require('winston-mongodb');
const express = require('express');
const startupDebug = require('debug')('app:start');
const app = express();
const morgan = require('morgan');
const config = require('config');
const mongoose = require('mongoose');
const mongoDebug = require('debug')('app:mongo')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals')
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');

winston.add(winston.transports.File, {filename: 'logfile.log'}); //file log
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly',
    level: 'error' //only error messages will be logged by winston
}); //database log

//$env:vidly_jwtPrivateKey='12345'
//$env:DEBUG='app:start,app:mongo'
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: vidly_jwtPrivateKey environment variable is not set, Authentication will not work');
    process.exit(1);
}

//connects to the database
mongoose.connect('mongodb://localhost/vidly')
    .then(() => mongoDebug('Connected to MongoDB...'))
    .catch((err) => mongoDebug('Could not connect to MongoDB...', err));


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

//Routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error); //only invoked when next() is called
//express-async-errors monkey-patches our code and wraps all requests
//in code similar to what we have in middleware/async.js


const port = process.env.PORT || 3000;
app.listen(port, () => startupDebug(`Listening on ${port}.`));