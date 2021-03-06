const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const Fawn = require('fawn');
Fawn.init(mongoose);

//checkin (send back cost of rental)
router.delete('/:id', [auth, admin], async (req, res) => {
    const id = req.params.id;
    if (!/^[0-9a-fA-F]{24}$/.test(id)) //if is not objectid
        return res.status(400).send('The parameter `id` did not match the pattern /^[0-9a-fA-F]{24}$/');

    ///This should be transacted ////////////////////////
    const rental = await Rental.findOneAndUpdate(
        { _id: id, dateReturned: { $exists: false } }, //query
        { $set: { dateReturned: Date.now() } }, //update
        { new : true} //options
    );

    if (!rental) return res.status(404).send('Rental not found or was already returned');

    await Movie.findOneAndUpdate(
        {_id : rental.movie._id},
        {$inc : { numberInStock : 1}}
    )
    /////////////////////////////////////////////////////
    
    res.status(200).send({
        cost: rental.calculateCost(),
        daysOut:  rental.getDaysOut()
    });
});

//checkout
router.post('/', auth, async (req, res) => {
    //do validation of client request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check existance of movie
    const movieId = req.body.movieId;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).send(`No movie found for id ${movieId}`);
    if (movie.numberInStock === 0) return res.status(400).send('No more of that movie in stock');

    //check existance of customer
    const customerId = req.body.customerId;
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).send(`No customer found for id ${customerId}`);

    let rental = new Rental({
        movie: _.pick(movie, ['_id', 'title', 'dailyRentalRate']),
        customer: _.pick(customer, ['_id', 'name', 'phone', 'isGold']),
    })

    //transacted movie rental
    try {
        new Fawn.Task()
            .save('rentals', rental) //collection name case sentitive
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run()
        res.status(200).send(rental);

    }
    catch (ex) {
        res.status(500).send('something failed');
    }
});


module.exports = router;




