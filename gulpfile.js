const elixir     = require( 'laravel-elixir' );
const edge       = require( 'edge.js' );
const path       = require( 'path' );
const gulp       = require( 'gulp' );
const fs         = require( 'fs' );
const util       = require( 'gulp-util' );
const Task       = elixir.Task;
require( 'laravel-elixir-livereload' );

// Setup edge view engine
edge.registerViews( path.join( __dirname, './examples' ) );

// Setup elixir
elixir.config.publicPath = 'dist';
elixir.config.assetsPath = 'src';

function replaceExt( path, oldExt, newExt ) {

    // Get all paths from the exemples folder
    const paths = fs.readdirSync( path );

    // For each dir on examples page
    paths.forEach( item => {
        if ( item.indexOf( oldExt ) ) {
            const withExt = item.replace( oldExt, newExt );
            fs.renameSync( `${path}/${item}`, `${path}/${withExt}` );
        }
    });
}

/**
 * compile
 * 
 * Add 'compile' task to elixir
 * 
 */
elixir.extend( 'compile', function() {
    new Task( 'compile', () => {

        // Creating .edge files
        replaceExt( './examples/components', 'html', 'edge' );
        replaceExt( './examples/layouts', 'html', 'edge' );
        replaceExt( './examples/pages', 'html', 'edge' );
    
        // Get all paths from the exemples folder
        const paths = fs.readdirSync( './examples/pages' );
    
        // For each dir on examples page
        paths.forEach( item => {
            
            // Removes the extension
            item = item.replace( '.edge', '' );       
    
            // Render the view
            let filename = util.colors.green('exemples/pages/'+item+'.edge');
            util.log( `Rendering ${filename} ...` );
            const viewStr = edge.render( `pages/${item}`, {} );
    
            // Creates the file
            filename = util.colors.green('dist/pages/'+item+'.html');
            util.log( `Creating ${filename} file ...` );        
            fs.writeFileSync( `./dist/pages/${item}.html`, viewStr );
            util.log( `File ${filename} successfuly created!` );
        });

        // Creating .hyml files
        replaceExt( './examples/components', 'edge', 'html' );
        replaceExt( './examples/layouts', 'edge', 'html' );
        replaceExt( './examples/pages', 'edge', 'html' );

    }).watch( [ './examples/**/**/*.html', ] );
});

/**
 * elixir
 * 
 * Call to laravel elixir to compile assets
 * 
 */
elixir( mix => {
    mix.compile().sass('../app/app.scss').webpack('../app/app.js').livereload();
});

// End of file