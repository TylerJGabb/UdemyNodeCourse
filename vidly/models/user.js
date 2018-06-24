const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}))

function validateUser(user){
    schema = {
        name: Joi.string().required().min(5).max(255),
        email: Joi.string().required().max(255).email(),
        password: Joi.string().min(5).max(1024).required() //user sends in plain text
    }

    return Joi.validate(user, schema);
}


exports.validate = validateUser;
exports.User = User;