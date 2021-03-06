const
    debug = require( 'debug' )( 'API::Routes' ),
    accepts = require( 'express-accepts' ),
    path = require( 'path' ),

    ApiController = require( `${__dirname}/../controllers/ApiController` );

/**
 *  ApiRoutes setup Express routes and link the requests to APIController actions.
 */
class ApiRoutes {
    constructor( app ) {
        this.apiController = new ApiController();

        this.app = app;

        // Setup express routes
        this.setupRoutes()
    }

    /**
     * Route setup container method.
     */
    setupRoutes() {
        debug( 'Setting up routes' );
        this.staticRoute();
        this.tvShowRoute();
        this.statusRoute();
    }

    /**
     * Static page for HTTP GET requests
     */

    staticRoute() {
        this.app.get('*', function(req, res) {
            res.sendFile(path.resolve('public/index.html'));

        });
    }

    /**
     * Show route, this is the Root route for Express, e.g / - http://localhost:PORT/
     */
    tvShowRoute() {
        debug( 'Show POST route set on /' );
        // Note: we use bind() as express doesn't know the context of this in method show()
        this.app.post( '/', accepts('application/json'), this.apiController.tvShow.bind( ApiController ) );
    }

    /**
     * Status route, this is used for external monitoring and a test
     */
    statusRoute() {
        debug( 'Status POST route set on /status' );
        // Note: we use bind() as express doesn't know the context of this in method show()
        this.app.post( '/status', function(req, res) {
            res.status( 200 ).json( '{ "response": "ok" }' );
        });
    }
}


module.exports = ApiRoutes;
