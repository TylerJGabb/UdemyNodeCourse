const startupDebug = require('debug')('app:startup');
const config = require('config')
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.set('view engine', 'pug'); //express internally loads the pug module for views
app.set('views', './views'); //tell express where we store the templates

//Middleware
app.use(express.json());
app.use(express.urlencoded( {extended : true}));
app.use(express.static('public')); //localhost:3000/readme.txt
app.use(helmet());

//Routes
app.use('/api/courses', courses);
app.use('/', home);

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

//Environment
//process.env.NODE_ENV = 'development'
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    
    //you must define the DEBUG environment variable for the following to log anything
    //process.env.DEBUG='app:startup'
    startupDebug('Morgan enabled...');
}

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}.`));
