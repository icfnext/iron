
var inquirer    = require( 'inquirer' );

var getClientLibs           = require( './../utils/getClientLibs' );
var clientLibsQuestions     = require( './../questions/clientlibs');
var clientLibsSolution      = require( './../solutions/clientlibs');


module.exports = function( answers ){

    getClientLibs( function( currentAemClientLibsList ){

        var ironRc      = require( 'rc' )( 'iron' );

        var clQuestions = clientLibsQuestions( currentAemClientLibsList, ironRc.components )

        if( answers.create_choice === 'Client Library' ){

            inquirer.prompt( clQuestions, clientLibsSolution )

        }


    } )


}
