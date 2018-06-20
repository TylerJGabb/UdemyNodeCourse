const express = require('express');
const startupDebug = require('debug')('app:start');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongoDebug = require('debug')('app:mongo')

//connects to the database
mongoose.connect('mongodb://localhost/vidly')
    .then(() => mongoDebug('Genres Connected to MongoDB...'))
    .catch((err) => mongoDebug('Could not connect to MongoDB...', err));


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));

const genres = require('./routes/genres');
app.use('/api/genres', genres);

app.use(morgan('tiny'));

const port = process.env.PORT || 3000;
app.listen(port, () => startupDebug(`Listening on ${port}.`));