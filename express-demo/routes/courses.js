const Joi = require('joi') //its a class
const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

//  /api/courses is implicitly in the request when we make it to this route
router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) //404
        res.status(404).send(`Course ${req.params.id} does not exist.`)
    res.send(course);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body); //object destructuring
    if (error) return res.status(400).send(error.details);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course)
    res.send(course).status(200);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) return res.status(404).send(`Course ${req.params.id} does not exist.`)

    const { error } = validateCourse(req.body); //object destructuring
    if (error) return res.status(400).send(error.details);
    
    course.name = req.body.name; //this mutates the array courses????!!!!
    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('course not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course).status(200);
})

validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;
