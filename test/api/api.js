const
    WebserverController = require( `${__dirname}/../../webserver/controllers/WebserverController` ),
    ApiRoutes = require( `${__dirname}/../../api/routes/ApiRoutes` ),
    ApiController = require( `${__dirname}/../../api/controllers/ApiController` ),

    fs = require('fs');
    supertest = require( 'supertest' );

/**
 * Test that our web service runs and starts on the correct port
 */
describe( 'API:' , function() {
    "use strict";

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

    // Webserver should be running and accesing our payload.json contents
    it( 'should accept our JSON payload and filter it as per 9Digital Specs', function( done ) {
        "use strict";

        const
            payload = fs.readFile( `${__dirname}/payload.json`, function( error, data ) {
                "use strict";

                supertest( webserver.app )
                    .post( '/' )
                    .send( JSON.parse( data ) )
                    .expect('Content-Type', /json/)
                    .expect( 200, done );
            });
    });

    // Webserver running and we send and expect back a specific amount of content.
    it( 'should return a response with a single show', function( done ) {
        "use strict";

        const singleShow = {
            "country": "UK",
            "drm": true,
            "episodeCount": 3,
            "image": {
                "showImage": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg"
            },
            "language": "English",
            "nextEpisode": null,
            "primaryColour": "#ff7800",
            "seasons": [
                {
                    "slug": "show/16kidsandcounting/season/1"
                }
            ],
            "slug": "show/16kidsandcounting",
            "title": "16 Kids and Counting",
            "tvChannel": "GEM"
        };

        supertest( webserver.app )
            .post( '/' )
            .send( {"payload": [ singleShow ]} )
            .expect('Content-Type', /json/)
            .expect({
                response:[{
                    'image' : singleShow.image.showImage,
                    'slug' : singleShow.slug,
                    'title' : singleShow.title
                }]
            })
            .expect( 200, done );
    });

    // Invalid JSON 400
    it( 'should return a 400 as our JSON is invalid', function( done ) {
        "use strict";

        supertest( webserver.app )
            .post( '/' )
            .send( '{"no_data: ""}' )
            .expect('Content-Type', /json/)
            .expect( 400, done );
    });

    // JSON with a payload key but no elements
    it( 'should return a 400 as our JSON has no shows in the payload key', function( done ) {
        "use strict";

        supertest( webserver.app )
            .post( '/' )
            .send( '{"payload: []}' )
            .expect('Content-Type', /json/)
            .expect( 400, done );
    });

});