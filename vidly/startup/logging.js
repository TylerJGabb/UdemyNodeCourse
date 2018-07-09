const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', ex => {
        throw ex; //turn rejection into exception
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly',
        level: 'info'
    });
}
