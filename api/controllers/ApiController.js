const
    debug = require( 'debug' )('API::Controller' );

/**
 *  API Controller holds methods used for requests on Express Routes
 */
class ApiController {

    /**
     * Parse JSON request and send back the required fields as set by 9Digital specs
     * @param req passed from Express
     * @param res passed from Express
     *
     * @returns a HTTP response and JSON string
     */
    tvShow(req, res) {
        const
            error = function () {
                res.status( 400 ).json( "{'error' : 'Could not decode request: JSON parsing failed'}" )
            };

        let
            jsonResponse = { 'response' : []};

        debug( 'Requested to run show route' );

        // If no body or no payload return an invalid error.
        if( !req.body || !req.body.payload || !req.body.payload.length > 0 ) {
            debug( 'No body or no payload sent to us.' );
            return error();
        }

        // Pull out each TV Show from the payload with DRM: true and the episodeCount is higher than 0
        req.body.payload.forEach( function( data ) {
            if( data.drm === true && data.episodeCount > 0 ) {
                let tvShow = {
                    'image' : data.image.showImage,
                    'slug' : data.slug,
                    'title' : data.title
                };

                debug( 'Pushed a TV Show into JSON response' );
                jsonResponse.response.push( tvShow );
            }
        });

        // If we have a response key and elements in our JSON object return it to the requester
        // Else return an error message.
        if( jsonResponse.response.length > 0 ) {
            debug( 'Returned 200 and send JSON response back to requester.' );
            return res.status(200).json( jsonResponse );
        } else {
            debug( 'JSON Response has no data in the response key, something went wrong..' );
            return error()
        }
    }
}

module.exports = ApiController;