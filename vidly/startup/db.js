const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    //connects to the database
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('Connected to MongoDB...'))
        .catch((err) => mongoDebug('Could not connect to MongoDB...', err));
}