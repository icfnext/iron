
var inquirer    = require( 'inquirer' );
var questions   = require( './questions' );
var solutions   = require( './solutions' );

inquirer.prompt( questions, function( answers ){
    solutions( answers );
});
