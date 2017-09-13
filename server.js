// Require and config dotenv for our environment variables.
require( 'dotenv' ).config();

const
    WebserverController = require( `${__dirname}/webserver/controllers/WebserverController` );

// Create the webserver and it's apply it's routes.
new WebserverController();