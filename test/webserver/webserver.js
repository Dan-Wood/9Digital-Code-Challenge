const
    WebserverController = require( `${__dirname}/../../webserver/controllers/WebserverController` ),
    ApiRoutes = require( `${__dirname}/../../api/routes/ApiRoutes` ),

    TestUtil = require( `${__dirname}/../testUtil` ),
    supertest = require( 'supertest' );

/**
 * Test that our web service runs and starts on the correct port
 */
describe( 'Webserver Start:' , function() {
    "use strict";

    const
        testUtil = new TestUtil();
    let
        webserver;

    /**
     * Before each test,
     * Initialise the webserver and apply it's routes.
     */
    beforeEach(function () {
        "use strict";

        webserver = new WebserverController();
        new ApiRoutes( webserver.app );
    });

    /**
     * After each test,
     * Close the webserver after all connections are closed.
     */
    afterEach(function ( done ) {
        "use strict";

        webserver.server.close( done );
    });

    // Run webserver and make sure it's up by using /status/
    it( 'should run the webserver and respond to a POST on /', function( done ) {
        "use strict";

        supertest( webserver.app )
            .post( '/status' )
            .expect('Content-Type', /json/)
            .expect( 200, done );
    });

    // Ensure the webserver is running on the specified port in the .env file
    it( `should be running on the port (${process.env.WEBSERVER_PORT}) set by .env`, function ( done ) {
        "use strict";

        const
            port = webserver.app.get( 'port' );

        testUtil.expect( port ).to.equal( process.env.WEBSERVER_PORT );

        done();

    });

    // Make sure other pages 404
    it( 'returns a 404 for other pages.', function( done ) {
        "use strict";

        supertest( webserver.app )
            .post( '/other/page/' )
            .expect( 404, done ) ;
    });

    // Ensure the root ( / ) doesn't allow GET requests
    it( '/ doesn\'t allow GET requests', function( done ) {
        "use strict";

        supertest( webserver.app )
            .get( '/' )
            .expect( 404, done );
    });
});