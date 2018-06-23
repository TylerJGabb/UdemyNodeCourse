const mongoose = require('mongoose');
// an object id is a 12 byte hexadecimal number,
// 24 characters because it takes two chars to represent one hex number

// the first 4 bytes are the encoded creation timestamp
// the next 3 bytes are the machine identifier
// the next 2 are the process identifier
// the last 3 are the counter



//generation
const objectId = new mongoose.Types.ObjectId();
console.log(objectId);

//get timestamp
console.log(`the objectId ${objectId} was created at ${objectId.getTimestamp()}`);

//validity
const isValid = mongoose.Types.ObjectId.isValid(objectId);
console.log(`isValid: ${isValid}`);

