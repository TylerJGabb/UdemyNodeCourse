const jwt = require('jsonwebtoken');
const config = require('config');

//Authorization middleware. Authorizes a request using the x-auth-token in its header.
//this token should have been provided by the authentication/creation of a user. 
module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = payload;
        next();

    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
}