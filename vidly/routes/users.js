const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

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
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    await user.save();

    const token = jwt.sign(_.pick(user,['_id']), config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).status(200).send(_.pick(user,[,'_id','name', 'email']));
});


module.exports = router;