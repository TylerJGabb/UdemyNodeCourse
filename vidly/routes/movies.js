const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.status(200).send(movies);
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);

    const genreId = req.body.genreId;
    let genre;
    try{ genre = await Genre.findById(genreId); }
    catch(e) { return res.status(500).send(e); }
    if(!genre) return res.status(404).send(`No genre found for id ${genreId}`);

    let movie = new Movie({
        title : req.body.title,
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate,
        genre
    });

    try{ movie.save() }
    catch(e) {req.status(500).send(e); }

    res.status(200).send(movie);
});

module.exports = router;

