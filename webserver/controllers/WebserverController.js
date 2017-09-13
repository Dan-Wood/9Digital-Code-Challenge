const
    ApiRoutes = require( `${__dirname}/../../api/routes/ApiRoutes` ),

    express = require( 'express' ),
    morgan = require('morgan'),
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

        // Setup logging for the webserver
        this.setupLogging();

        // Setup port, we use the set() method so we can call the getter in our tests
        this.app.set( 'port', this.port );

        // Set express to use body-parser middleware
        this.app.use(bodyParser.json());

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

    /**
     * Creates an access log file for Epress/Morgan to log HTTP requests to, 200 - 400 - 404 etc.
     */
    setupLogging() {
        const logStream = fs.createWriteStream( `${__dirname}/../../logs/webserver/access.log`, {flags: 'a'} );
        if (process.env.NODE_ENV === 'prod') {
            this.app.use(
                morgan( 'combined', { stream: logStream } )
            );
        } else {
            this.app.use( morgan( 'dev' ) );
        }
    }
}

module.exports = WebserverController;