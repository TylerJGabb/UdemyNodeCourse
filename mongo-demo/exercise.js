const mongoose = require('mongoose');

//connects to the database
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    tags : [String],
    date :{
        type : Date,
        default : Date.now()
    },
    name : String,
    author : String,
    isPublished : Boolean,
    price : Number
});

const Course = mongoose.model('Course', courseSchema);

const exercise1 = new Promise((resolve, reject) => {
    const courses = Course
    .find({isPublished : true, tags : 'backend'})
    .sort({name : 1})
    .select({name : 1, author : 1});
    resolve(courses)
});

const exercise2 = new Promise(resolve => {
    const courses = Course
    .find({isPublished : true, tags : { $in : ['backend', 'frontend']}})
    //.or([{tags : 'frontend'}, {tags: 'backend'}])
    .sort('-price')
    .select('name author price')
    resolve(courses);
});
 
const exercise3 = new Promise(resolve => {
    const courses = Course
    .find({isPublished : true})
    .or([
        {price : {$gte : 15}},
        {name : /.*by.*/i}
    ])
    .sort('-price')
    .select('name author price');
    resolve(courses);
});

exercise3.then((courses) => console.log(courses))
.catch((err) => console.log(err));
