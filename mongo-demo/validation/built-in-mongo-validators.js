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
        enum: ['web', 'mobile', 'network'], //category can be only one of thise values
        lowercase : true, //will set the value to lowercase before puttint in DB
        trim : true//will trim padding

    },
    tags : {
        type: Array,
        validate: {
            isAsync : true,
            validator: function(value, callback) {
                setTimeout(() => {
                    const result = value && value.length > 0;
                    callback(result); 
                }, 4000); //fake some async work
            },
            message: 'A course should have at least one tag'
        }
    },
    date :{
        type : Date,
        default : Date.now()
    },
    author : {
        type: String,
        required: function() {return this.isPublished}
    },
    isPublished : Boolean,
    price : {
        type : Number,
        min: 10,
        max: 200,
        required : function() { return this.isPublished }, //can not use annon func here because we want 
        //'this' to be the actual course, not whatever object is calling this function
        get: val => Math.round(val), //will round the value
        set: val => Math.round(val)  //to the nearest whole number before putting in DB
    }
});

const Course = mongoose.model('course', courseSchema);

async function createBadCourse(){
    const badCourse = new Course({
        name: 'Tried to put a price of 150.555',
        author: 'Russel Lewis',
        tags: ['Frontend','BacKEnD'],
        isPublished : true,
        price: 150.555,
        category : 'mobile'
    });
    const result = await badCourse.save();
    return result; //throws rejected promise because fails validation
}

async function testPriceGetter(){
    const course = await Course.find({_id : '5b29de5a476a592aa0fdd0bf'});
    return course;
}

async function run(){
    // createBadCourse()
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err.message));
    const roundedPriceCourse = await testPriceGetter();
    console.log(roundedPriceCourse[0]);
}

run();



