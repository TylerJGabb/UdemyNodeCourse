//import file system moduyle
const fs = require('fs');


//use asynchronus readdir (read directory) function, and give it a callback
//which tells it what to do when it finishes gathering a result
fs.readdir('./', function(err, files){
    if(err) console.log('Error',err);
    else console.log('Result',files);
});