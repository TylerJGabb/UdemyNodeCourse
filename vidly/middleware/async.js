/**
 * This used to be used to wrap our route handlers in, but was
 * replaced by 'express-async-errors' which essentually does the same thing
 * when imported. 
 */


module.exports = function asyncMiddleware(handler){
    return async (req, res, next) => {
        try{
            await handler(req,res)
        }
        catch(ex){
            next(ex);
        }
    }
}