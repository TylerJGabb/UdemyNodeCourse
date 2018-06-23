const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

//embed an array of genre document inside of a movie

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    genre: {
        type: genreSchema,
        required : true
    }, 
    numberInStock: {
        type : Number,
        min : 0,
        max : 20
    },
    dailyRentalRate: {
        type : Number,
        required : true,
        min : 0,
        max : 50
    }
}));

//The Joi schema dictates what we expect from the user.
//We want the user to hand us a valid genreId, not make their own 
//genre object.
function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().max(50),
        numberInStock : Joi.number().min(0).max(20),
        dailyRentalRate : Joi.number().min(0).max(50).required()
    };
    return Joi.validate(movie, schema);
}

exports.validate = validateMovie;
exports.Movie = Movie;





