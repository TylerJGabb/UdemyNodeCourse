const EventEmitter = require('events');

var url = 'https://mylogger.io/log';

/**
 * Extends the EventEmitter class and adds a .log(message) function.
 * raises 'logging' and 'messageLogged' events before and after logging.
 * 
 * Create a new instance of the logger class by using
 * Logger = require('logger');
 * logger = new Logger();
 * logger.log(....); 
 */
class Logger extends EventEmitter{
    log(message){
        this.emit('logging')
        
        console.log(message);
        
        //the current context.emit
        this.emit('messageLogged', {
            id  : 1,
            url : url 
        });
    }
}

module.exports = Logger;

