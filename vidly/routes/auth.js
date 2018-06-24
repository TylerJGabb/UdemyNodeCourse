const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid username or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid username or password');

    const token = user.generateAuthToken();
    res.status(200).send(token);
});

function validate(req){
    schema = {
        email: Joi.string().required().max(255).email(),
        password: Joi.string().min(5).max(1024).required() //user sends in plain text
    }

    return Joi.validate(req, schema);
}

module.exports = router;