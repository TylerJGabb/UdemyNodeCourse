const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genre');
const auth = require('../middleware/auth');

//we are assumed to be in /api/genres/
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres).status(200);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const g = await Genre.findById(id);
    if(!g) return res.status(404).send();
    return res.send(g).status(200);
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({name : req.body.name});
    await genre.save() //genre is a variable, and can be changed by the save method
    res.send(genre).status(200);
});

router.put('/:id', auth, (req, res) => {
    const id = req.params.id;
    const {e} = validate(req.body);
    if(e) return res.status(400).send(e);
    Genre.findByIdAndUpdate(id, {
        $set: {
            name : req.body.name
        }
    }, {new : true})
    .then(g => res.send(g).status(200))
    .catch(e => res.status(500).send(e));
})

router.delete('/:id', auth, (req, res) => {
    const id = req.params.id;
    Genre.findByIdAndRemove(id)
    .then(result => res.status(200).send(result))
    .catch(e => res.status(500).send(e));
});

module.exports = router;