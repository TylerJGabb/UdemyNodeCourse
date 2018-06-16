const helmet = require('helmet');
const Joi = require('joi')
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended : true}));
app.use(express.static('public')); //localhost:3000/readme.txt
app.use(helmet());

//process.env.NODE_ENV
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('morgan logging enabled');
}

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

app.get('/', (req, res) => {
    res.send('Hello, World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) //404
        res.status(404).send(`Course ${req.params.id} does not exist.`)
    res.send(course);
});

app.post('/api/courses/', (req, res) => {
    const { error } = validateCourse(req.body); //object destructuring
    if (error) return res.status(400).send(error.details);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course)
    res.send(course).status(200);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) return res.status(404).send(`Course ${req.params.id} does not exist.`)

    const { error } = validateCourse(req.body); //object destructuring
    if (error) return res.status(400).send(error.details);
    
    course.name = req.body.name; //this mutates the array courses????!!!!
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
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


// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}.`));
