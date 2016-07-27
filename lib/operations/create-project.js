var fs               = require('fs');
var shell            = require('shelljs');
var npm              = require('npm');
var inquirer         = require('inquirer');

var templates        = require('../utils/getTemplates')();
var templateRenderer = require('../utils/template-renderer');
var clientLibs       = require('../utils/getClientLibs');
var pomBuilder       = require('../utils/pom-builder');

function buildCatArray ( catArray ) {

    var upperCassedCatArray = catArray.map( function( cat, index ) {
        if( index !== 0 ){
            return cat.charAt(0).toUpperCase() + cat.slice(1)
        } else {
            return cat;
        }

    } );

    return upperCassedCatArray;
}

function createClientLibBaseCat ( projectName ) {

    var hasDash = projectName.indexOf( "-" );
    var hasUnderscore = projectName.indexOf( "_" );

    if( hasDash !== -1 ){
        projectName = projectName.split( '-' );
        return buildCatArray( projectName ).join('');
    }

    if( hasUnderscore !== -1 ){
        projectName = projectName.split( '_' );
        return buildCatArray( projectName ).join('');
    }

}

module.exports = function( program ){

    var currentDir = shell.pwd().stdout.split("/")[ shell.pwd().stdout.split("/").length - 1 ];

    var config = {
        name                : program.args[0],
        default_components  : [],
        iron_build_root     : program.args[0] + '-iron-fe'
    };

    config.clientlib_base_category = createClientLibBaseCat( config.name );
    
    try {
        var parentPom       = fs.readFileSync('pom.xml').toString();
        
        pomBuilder(
            config.name,
            parentPom,
            config.iron_build_root);
        
    } catch( err ){
        console.error( "Your project does not have a parent pom file!", err );
    }
    
    
    shell.mkdir( config.iron_build_root );
    shell.mkdir( config.iron_build_root + '/components' );
    shell.mkdir( config.iron_build_root + '/aem-bundles' );
    shell.cd( config.iron_build_root );

    npm.load( function(){

        npm.init( function(){

            clientLibs( function( libs ){

                shell.cd( '..' );

                if( libs[0] ){
                    var clientlibsPath      = libs[0].path.split( "/" );
                    config.clinetlib_root   = clientlibsPath
                                                .splice( 0, clientlibsPath.indexOf('clientlibs') + 2 )
                                                .join('/');

                    fs.writeFileSync( '.ironrc' , config);
                } else {

                    var nodeDir = require('node-dir');
                    nodeDir.subdirs(shell.pwd().stdout, function (err, subdirs) {
                        // Files is an array of filename

                        var index = subdirs.findIndex( function( filePath ){
                            var pathArray   = filePath.split('/');
                            var foundAt     = pathArray.indexOf("clientlibs");

                            return (foundAt !== -1);
                        } );

                        var clientlibFullPath = subdirs[index].split('/');
                        config.clinetlib_root = clientlibFullPath
                                                    .splice( clientlibFullPath
                                                                .indexOf( currentDir ) + 1 )
                                                    .join('/');

                        shell.mkdir( config.clinetlib_root + '/' + config.name );
                        config.clinetlib_root = config.clinetlib_root + '/' + config.name;

                        fs.writeFileSync( '.ironrc' , JSON.stringify( config, null, 4 ) );

                    } )

                }

            } );

        } )

    } )




}
