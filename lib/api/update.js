var fs              = require( 'fs' );
var shell           = require( 'shelljs' );
var inquirer        = require( 'inquirer' );
var _               = require( 'underscore' );

var getRootPath     = require( '../utils/pathToProjectRoot' );
var manageRC        = require( '../utils/manageRC' );

var readDir = function( path ) {

    var dir = fs.readdirSync( path )
        .filter( function ( dir ) {
            // return true if `dir` does not start with a `.`
            // to avoid dotfiles causing ENOTDIR (not a directory) errors
            return !dir.match( /^\.[\w -]/ );
        } );

    return dir;
}

function componentMatcher(componentToFind, component, index, array){
    return componentToFind === component.name;
}

var updateIronRc = function() {
    var ironRc  = require( 'rc' )( 'iron' );
    var root    = getRootPath() + ironRc.build_root;

    // Add all new components
    shell.cd( root );
    shell.cd( 'components' );

    var components = shell.ls().filter( function( component, index ){

        var finder = componentMatcher.bind( null , component );
        var found  = ironRc.components.findIndex( finder );


        return found < 0;

    } );

    components.forEach( function( comp, index ) {

        ironRc.components.push( {
            name            : comp,
            isADefault      : false,
            clientlibraries : []
        } );

    } );

    shell.cd( root );
    shell.cd( 'client-libraries' );

    var bundles = shell.ls().filter( function( library, index ){

        var finder = componentMatcher.bind( null , library );
        var found  = ironRc.components.findIndex( finder );


        return found < 0;

    } );



    bundles = _.flatten( bundles );

    if( bundles.length > 0 ){

        bundles.map( function( bundle ){
            return [
                {
                    type    : "confirm",
                    name    : "link_bundle_" + bundle,
                    message : "Do you want to link " + bundle + " to an existing AEM clientlibrary?",
                    default : true
                },
                {
                    type    : "list",
                    name    : "linked_clientLib_" + bundle,
                    message : "Which AEM client library does this "+ bundle +" get placed in?",
                    when    : function( answers ){
                        return answers[ "link_bundle_" + bundle ]
                    },
                    choices : ironRc.aemClientlibs.map( function( aemLib ){
                        return {
                            name    : aemLib.name,
                            value   : aemLib
                        }
                    } )
                }
            ];
        } )

        console.log(inquirer);

        inquirer.prompt( bundles, function( answers ) {
            console.log(answers);
        } );

    }

    // libraries.forEach( function( lib, index ) {
    //
    //
    //     // ironRc.components.push( {
    //     //     name                : answers.clientlib_name,
    //     //     aemPath             : answers.clientlib_root_path + answers.clientlib_path + "/" + answers.clientlib_name,
    //     //     path                : 'client-libraries/' + answers.clientlib_name + '/',
    //     //     entry               : {
    //     //         js    : 'client-libraries/' + answers.clientlib_name + '/' + answers.clientlib_name + '.js',
    //     //         style : 'client-libraries/' + answers.clientlib_name + '/styles/' + answers.clientlib_name + '.' + styleType
    //     //     },
    //     //     components          : answers.components ? answers.components : [],
    //     //     defaultComponents   : answers.clientlib_default_components,
    //     //     styleType           : styleType
    //     // });
    //
    // } );


    //if( components.length > 0 ) manageRC.update( ironRc );


    console.log( "Components added : " + components.length );
    console.log( "Libraries added  : " + bundles.length );

}

module.exports = updateIronRc;
