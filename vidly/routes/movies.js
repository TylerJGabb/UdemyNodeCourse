const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.status(200).send(movies);
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error);
    let movie = new Movie(req.body);
    try{ await movie.save(); } 
    catch (err) { return res.status(500).send(err);}
    res.status(200).send(movie);
});

module.exports = router;

