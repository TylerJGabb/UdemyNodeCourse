const mongoose = require('mongoose');

//connects to the database
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength: 5,
        maxlength: 255,
        //match : /pattern/,
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network'] //category can be only one of thise values
    },
    tags : [String],
    date :{
        type : Date,
        default : Date.now()
    },
    author : String,
    isPublished : Boolean,
    price : {
        type : Number,
        min: 10,
        max: 200,
        required : function() { return this.isPublished } //can not use annon func here because we want 
        //'this' to be the actual course, not whatever object is calling this function
    }
});

const Course = mongoose.model('course', courseSchema);

async function createBadCourse(){
    const badCourse = new Course({
        name: 'Another New Course',
        author: 'Foo',
        tags: ['bar','qux'],
        isPublished : true,
        price: 15,
        category : 'not in the enums'
    });
    const result = await badCourse.save();
    return result; //throws rejected promise because fails validation
}

async function run(){
    createBadCourse()
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

run();



