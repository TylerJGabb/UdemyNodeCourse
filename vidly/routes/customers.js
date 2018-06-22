const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    res.send({msg: "Hello, World"}).status(200);
})


module.exports = router;