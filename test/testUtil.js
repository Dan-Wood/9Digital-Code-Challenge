require('dotenv').config(); // Load our environment variables from .env

// Set our environment to test
process.env.NODE_ENV = 'test';

const
    chai = require( 'chai' );

/**
 * TestUtil is a setup class for specific functionality used in testing
 */
class TestUtil {

    constructor() {
        // Setup our Chai interfaces and tie them to TestUtil
        this.assert = chai.assert;
        this.expect = chai.expect;
        this.should = chai.should();
    }

}

module.exports = TestUtil;