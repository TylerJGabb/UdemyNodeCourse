const express = require('express');
const app = express();
const Joi = require('joi')
app.use(express.json());

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Romance'},
]

app.get('/api/genres', (req, res) => {
    res.send(genres).status(200);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`genre with id of '${req.params.id}' not found`);

    res.status(200).send(genre);
});

app.post('/api/genres', (req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details);

    const genre = {
        id: genres.length + 1,
        name : req.body.name
    }

    genres.push(genre);
    res.status(200).send(genre)
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`genre with id of '${req.params.id}' not found`);

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details);

    genre.name = req.body.name;
    res.status(200).send(genre);
})

app.delete('/api/genres/:id', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}.`));