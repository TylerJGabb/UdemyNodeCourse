const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author : {
    type : authorSchema
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
  const course = await Course.findById(courseId);
  course.author.name = 'Tyler Gabb';
  course.save(); //NOT course.author.save(), that does not exist.
  //the author exists only in the context of course
}

async function updateAuthorDirectly(courseId){
  const course = await Course.update({_id : courseId},{
    $set : {
      'author.name' : 'John Smith'
    }
  }); //updated author's name directly
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));

// updateAuthor('5b2da05d549e644d10ff7cf1');

updateAuthorDirectly('5b2da05d549e644d10ff7cf1')
