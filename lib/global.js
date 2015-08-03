
var inquirer    = require( 'inquirer' );
var questions   = require( './questions' );
var solutions   = require( './solutions' );



module.exports = function( ){

    inquirer.prompt( questions, function( answers ){
        solutions( answers );
    });

}
