
const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

//register a listener
logger.on('messageLogged', (eventArg) => {
    console.log('Listener called', eventArg);
});

logger.log('message');