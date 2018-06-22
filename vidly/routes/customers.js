const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('customer', new mongoose.Schema({
    isGold : {
        type: Boolean,
        required: true
    },

    name : {
        type: String,
        required: true
    },
    phone : {
        type : String
    }
}));


router.get('/', async (req, res) => {
    res.send(await Customer.find()).status(200);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    let c;
    try{ c = await Customer.findById(id); } 
    catch(err){ return res.status(500).send(err);}
    if(!c) return res.status(404).send();
    return res.status(200).send(c);
});

router.post('/', async (req,res) => {
    const {error} = validateCustomer(req.body);
    if(error) return res.send(error).status(400);
    let c = new Customer(req.body);
    c.save()
        .then(() => res.send(c).status(200))
        .catch(err => res.send(err).status(500));
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {error} = validateCustomer(req.body);
    if(error) return res.send(error).status(400);
    let c;
    try{c = await Customer.findById(id);}
    catch(e){return res.status(500).send(e)}
    if(!c) return res.status(404).send();
    c.name = req.body.name;
    c.isGold = req.body.isGold;
    c.phone = req.body.phone;
    c.save()
        .then(() => res.status(200).send(c))
        .catch(e => res.status(500).send(e));
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    Customer.findByIdAndRemove(id)
    .then(r => res.status(200).send(r))
    .catch(e => res.status(500).send(e));
});


function validateCustomer(customer){
    const schema = {
        name : Joi.string().required(),
        isGold : Joi.bool().required(),
        phone : Joi.string().required()
    }
    return Joi.validate(customer, schema);
}

module.exports = router;