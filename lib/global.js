
var inquirer    = require( 'inquirer' );



module.exports = function( ){

    var questions   = require( './questions' )();
    var solutions   = require( './solutions' );


    inquirer.prompt( questions, function( answers ){
        solutions( answers );
    });

}
