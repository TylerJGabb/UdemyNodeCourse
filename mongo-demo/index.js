const mongoose = require('mongoose');

//connects to the database
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

//defines the shape of Course documents in our MondoDB database
const courseSchema = new mongoose.Schema({
    name : String, 
    author: String,
    tags: [String], //array of string
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
async function saveCourse(course){
    const result = await course.save();
    console.log(result);
}

//get a list of courses
async function getCourses(){
    console.log('getting courses')
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true}) //find all the published courses by mosh
        //.find({price : { $gte : 10, $lte : 20}}) //find all courses whose price is between 10 and 20 
        //.find({price : { $in : [10,25,20]}}) //find all courses whose price is either 10, 15, 20 dollars

        // .find()                                              |Finds all the courses whose author is Mosh 
        // .or([ {author : 'Mosh'}, {isPublished : true}])      |or that are published

        //.find({author : /^Mosh/ }) //use regex to find courses whose author begins with Mosh

        //.find({author : /Hamedani$/i}) //case insentisive authors ending with Hamedani

        //.find({author :  /.*Mosh.*/ })

        .limit(10)
        .sort({name : 1})//sort by name in ascending order
        //.count(); //count the number of matched documents
        
        .select({name : 1, tags: 1})// only select the name and the tags
    console.log(courses);
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}
run();
