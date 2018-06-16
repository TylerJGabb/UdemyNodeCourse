const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json());

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));

const genres = require('./routes/genres');
app.use('/api/genres', genres);

app.use(morgan('tiny'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}.`));