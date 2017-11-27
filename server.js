const express         = require('express');
const app             = express();

// Set the view engine
app.use( express.static( 'dist' ) );

// Starts the server
app.listen( 8080, ( status ) => console.log( 'Server running on port 8080' ) );

// End of file