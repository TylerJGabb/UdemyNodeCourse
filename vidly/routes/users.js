const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const _ = require('lodash');

router.get('/', async (req, res) => {
    const users = await User.find().sort('email');
    res.status(200).send(users);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already exists');

    user = new User(_.pick(req.body, ['name','email','password']));
    await user.save();

    res.status(200).send(_.pick(user,[,'_id','name', 'email']));
});


module.exports = router;