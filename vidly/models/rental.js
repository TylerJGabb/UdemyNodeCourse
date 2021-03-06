//a rental is a relationship between a customer and a movie
//a rental will have a movie, customer, dateRenter, and dateReturned
const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
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
});

//gets the number of days (floating point number) that the movie has been out
rentalSchema.methods.getDaysOut = function(){
    var returnDate = this.dateReturned ? this.dateReturned : Date.now();
    var timespan = returnDate - this.dateRented;
    return timespan/(1000*60*60*24);
}

//calculates the cost given the time that the movie has been out
rentalSchema.methods.calculateCost = function(){
    return this.getDaysOut()*this.movie.dailyRentalRate;
}

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    }
    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;

