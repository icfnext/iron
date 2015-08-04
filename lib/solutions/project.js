
var inquirer    = require( 'inquirer' );

var getClientLibs           = require( './../utils/getClientLibs' );

// create client library questions and answers
var clientLibsQuestions     = require( './../questions/clientlibs');
var clientLibsSolution      = require( './../solutions/clientlibs');

// create components questions and answers
var componentsQuestions     = require( './../questions/components');
var componentsSolution      = require( './../solutions/components');


module.exports = function( answers ){

    getClientLibs( function( currentAemClientLibsList ){

        var ironRc      = require( 'rc' )( 'iron' );

        var clQuestions = clientLibsQuestions( currentAemClientLibsList, ironRc.components )

        if( answers.create_choice === 'Client Library' ){

            inquirer.prompt( clQuestions, clientLibsSolution )

        }

        if( answers.create_choice === 'Component' ){
            
            var compQuestions = componentsQuestions();

            inquirer.prompt( compQuestions, componentsSolution )

        }


    } )


}
