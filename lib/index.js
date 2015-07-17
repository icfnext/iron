
var inquirer  = require('inquirer');
var shell     = require('shelljs');

var questions   = require( './questions' );
var solutions   = require( './solutions' );

inquirer.prompt( questions, function( answers ){
    solutions( answers );
});
