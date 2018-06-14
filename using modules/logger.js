//(function (exports, require, module, __filename, __dirname)
var url = 'https://mylogger.io/log';

function log(message){
    //Send HTTP request;
    console.log(message);
}

module.exports.log = log; //add the log function to this module's exports
module.exports.obj = {
    field1 : 10,
    field2 : 20,
    field3 : "12312"
}; //add a play object

//this works because exports is a reference to
exports.Func = function(){
    return "!";
}