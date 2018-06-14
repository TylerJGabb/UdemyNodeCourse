
const os = require('os');

var freeMemory = os.freemem();
var totalMemory = os.totalmem();
var gb = Math.pow(1024,3);

console.log(`You are using ${freeMemory/gb} out of ${totalMemory/gb} Gb of memory`)