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
saveCourseSync(course);
