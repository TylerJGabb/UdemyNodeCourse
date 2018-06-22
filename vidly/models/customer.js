const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('customer', new mongoose.Schema({
    isGold : {
        type: Boolean,
        required: true
    },

    name : {
        type: String,
        required: true
    },
    phone : {
        type : String
    }
}));

function validateCustomer(customer){
    const schema = {
        name : Joi.string().required(),
        isGold : Joi.bool().required(),
        phone : Joi.string().required()
    }
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;