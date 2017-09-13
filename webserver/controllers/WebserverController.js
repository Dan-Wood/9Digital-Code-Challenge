const
    ApiRoutes = require( `${__dirname}/../../api/routes/ApiRoutes` ),

    express = require( 'express' ),
    fs = require('fs'),
    debug = require( 'debug' )( 'Webserver::Controller' ),
    bodyParser = require( 'body-parser' );

/**
 * Webserver, load Express and listen on the PORT defined in .env as an environment variable
 */
class WebserverController {

    constructor() {
        // Initialise Express and get the port from .env or apply a default.
        this.app = express();
        this.port = process.env.WEBSERVER_PORT || 3000;

        // Setup port, we use the set() method so we can call the getter in our tests
        this.app.set( 'port', this.port );

        // Set express to use body-parser middleware
        //this.app.use( bodyParser.json() );

        this.app.use( bodyParser.json(), function( err, req, res, next ) {

            // Check if our req.body is actually JSON, body-parser will throw an error if it's not, we need to capture that here and display a nice message.
            if( err.type === 'entity.parse.failed' ) {
                debug( 'content isn\'t being passed in as JSON' );
                res.status( 400 ).json( '{"error" : "Could not decode request: JSON parsing failed"}' )
            } else {
                next();
            }
        } );

        debug( `Setting up Express and listening on port ${this.app.get( 'port' )}` );
        this.server = this.app.listen( this.app.get( 'port' ), function() {

            // If we're in production show a nice output on the console
            if( process.env.NODE_ENV === "prod" ) {
                console.log( `Webserver started on port ${this.address().port}` );
            }
        });

        // Setup routes for the API
        new ApiRoutes( this.app )
    }

}

module.exports = WebserverController;