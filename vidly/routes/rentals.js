const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie')
const { Customer } = require('../models/customer')

router.post('/', async (req, res) => {
    //do validation of client request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check existance of movie
    const movieId = req.body.movieId;
    let movie;
    try { movie = await Movie.findById(movieId); }
    catch (e) { return res.status(500).send(e) }
    if (!movie) return res.status(404).send(`No movie found for id ${movieId}`);
    if(movie.numberInStock === 0) return res.status(400).send('No more of that movie in stock');

    //check existance of customer
    const customerId = req.body.customerId;
    let customer;
    try { customer = await Customer.findById(customerId); }
    catch (e) { return res.status(500).send(e) }
    if (!customer) return res.status(404).send(`No customer found for id ${customerId}`);

    let rental = new Rental({
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: movie._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        }
    })

    rental.save();

    movie.numberInStock--;
    movie.save();

    res.status(200).send(rental);
});


module.exports = router;




