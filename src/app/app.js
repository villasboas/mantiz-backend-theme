// Require the dependencies
const popper    = require( 'popper.js' );
const bootstrap = require( 'bootstrap' );


/**
 * Load Jquery for bootstrap and pages use
 * 
 */
try {
    window.$ = window.jQuery = require( 'jquery' );
} catch (e) {}

// End of file