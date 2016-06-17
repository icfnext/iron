var rc      = require('rc');
var fs      = require( 'fs' );
var path    = require( 'path' );
var shell   = require( 'shelljs' );

var utils = require( '../../utils' );

module.exports = {

    all : function(){

        // Make sure we are at the iron build root
        utils.pathToProjectRoot();


        var bundlesArray = fs.readdirSync( 'aem-bundles' )
    		.filter( function ( dir ) {
    			// return true if `dir` does not start with a `.`
    			// to avoid dotfiles causing ENOTDIR (not a directory) errors
    			return !dir.match( /^\.[\w -]/ );
    		} );

    	var bundles = {
    		bundleNames: [],
    		bundleCount: bundlesArray.length,
    		bundlePaths: [],
    		bundles: []
    	};

    	for ( let i = 0; i < bundlesArray.length; i++ ) {

    		let bundle = {
    			components : []
    		};

    		bundle.name = bundlesArray[ i ];
    		bundle.path = 'aem-bundles/' + bundle.name;
    		bundle.main = 'main.' + bundle.name + ".js";


    		let hasConfig = fs.existsSync( './' + bundle.path + '/config.json' );


    		if ( hasConfig ) {
    			bundle.config = require( shell.pwd().stdout + '/' + bundle.path + '/config.json' );
    		} else {
    			let error = 'Confg json file is required. Your bundle located here: ' +
    				chalk.bgRed.white( bundle.path ) + ' is missing the config. Add one or delete the folder';
    			console.log( error );
     		}


    		if ( fs.existsSync( path.resolve( bundle.config.clientLibPath ) ) ) {
    			bundle.config.clientLibPath = path.resolve( bundle.config.clientLibPath );
    		} else {
    			let error = 'Please defign a valid path to the bundle\'s clientlib in the config.json for : ' +
    				chalk.bgRed.white( bundle.path );
    			throw error
    		}

    		for( let i in bundle.config.components ){

    			let component = bundle.config.components[ i ];

    			bundle.components.push( {
    				name 	 : component,
    				isGlobal : component === 'global'
    			} );

    		}


    		bundles.bundles.push( bundle );

    		bundles.bundleNames.push( bundle.name );

    	}


    	return bundles;

    },
    one : function( libName ){

        var ironRc = require('rc')('iron');

        for (var i = 0; i < ironRc.clientlibraries.length; i++) {

            var lib = ironRc.clientlibraries[i];

            if( lib.name === libName ){
                return lib;
            }

        }

    }

}
