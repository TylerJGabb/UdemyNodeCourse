const winston = require('winston');
const express = require('express');
const app = express();
require('express-async-errors'); //monkey patches our routes, wraps in try/catch
// uses last middleware in pipeline to handle exceptions
//this allows logging to a nosql db using mongoose.

require('./startup/logging')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on ${port}.`));