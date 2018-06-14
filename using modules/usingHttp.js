
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello, Index');
        res.end();
    }
    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3,4,5])); //you need to send back JSON
        res.end();
    }
});



server.listen(3000);

console.log('listening on 3000');
