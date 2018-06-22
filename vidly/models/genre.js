const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('genre', new mongoose.Schema({
    name: {
        type: String,
        required : true,
        minlength : 3,
        maxlength : 20
    }
}));

const validateGenre = (genre) => {
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
