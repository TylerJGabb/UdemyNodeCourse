const config = require('config');

//$env:vidly_jwtPrivateKey='12345'
//$env:DEBUG='app:start,app:mongo' not really used anywhere anymore
module.exports =  function() {
    if(!config.get('jwtPrivateKey'))
        throw new Error('FATAL ERROR: vidly_jwtPrivateKey environment variable is not set, Authentication will not work');
}
