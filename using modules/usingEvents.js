
const EventEmitter = require('events');
const emitter = new EventEmitter();

//register a listener
emitter.on('messageLogged', (eventArg) => {
    console.log('Listener called', eventArg);
}) 

//raised event
emitter.emit('messageLogged', {
    id  : 1,
    url : 'http://google.com' 
});

