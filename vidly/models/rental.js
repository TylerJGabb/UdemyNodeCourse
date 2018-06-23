//a rental is a relationship between a customer and a movie
//a rental will have a movie, customer, dateRenter, and dateReturned
const mongoose = require('mongoose');
const Joi = require('joi')

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
            
        }),
        required : true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateRented: {
        type: Date,
        default: Date.now()
    },
    dateReturned: {
        type: Date //not required because when the movie is out
        //this field will be null
    }
}));

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().min(24).max(24).required(),
        movieId: Joi.string().min(24).max(24).required(),
    }
    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
