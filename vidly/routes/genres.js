const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Romance'},
]

//we are assumed to be in /api/genres/
router.get('/', (req, res) => {
    res.send(genres).status(200);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`genre with id of '${req.params.id}' not found`);

    res.status(200).send(genre);
});

router.post('/', (req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details);

    const genre = {
        id: genres.length + 1,
        name : req.body.name
    }

    genres.push(genre);
    res.status(200).send(genre)
});

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`genre with id of '${req.params.id}' not found`);

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details);

    genre.name = req.body.name;
    res.status(200).send(genre);
})

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`genre with id of '${req.params.id}' not found`);

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genres).status(200);
});


const validateGenre = (genre) => {
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;