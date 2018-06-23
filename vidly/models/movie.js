const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema, validate} = require('./genre');

//embed an array of genre document inside of a movie

const Movie = mongoose.Model('Movie',new mongoose.Schema({
    title: {
        type: String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    genre: {
        type: [genreSchema],
        required : true,
        validator : function(val) {
            return val && val.length > 0;
        } 
    }, 
    numberInStock: {
        type : Number,
        min : 0,
        max : 20
    },
    dailyRentalRate: {
        type : Number,
        required : true
    }
}));

function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genre: Joi.array().min(1).required(),
        numberInStock : Joi.number().min().max(20),
        dailyRentalRate : Joi.number().required()
    };
    return Joi.validate(movie, schema);
}

exports.validate = validateMovie;
exports.Movie = Movie;





