
var inquirer    = require( 'inquirer' );
var questions   = require( './global' );

module.exports = function( ){

    inquirer.prompt( [
        {
            type : "confirm",
            name : "exit",
            message : "Would you like to add a new component or client library?",
            default : false
        }
    ], function( answers ){

        if( answers.exit !== false ){

            questions();

        }

    });

}
