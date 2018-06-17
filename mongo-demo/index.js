const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

//defines the shape of Course documents in our MondoDB database
const courseSchema = new mongoose.Schema({
    name : String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean
});

//create a Course class from the schema
const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags : ['angular', 'frontend'],
    isPublished : true
});

//save to the database
async function saveCourseSync(course){
    const result = await course.save();
    console.log(result);
}

async function getCourses(){
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true})
        .limit(10)
        .sort({name : 1})//sort by name in ascending order
        .select({name : 1, tags: 1})// only select the name and the tags
    console.log(courses);
}

getCourses();

//saveCourseSync(course);
