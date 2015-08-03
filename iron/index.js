
var inquirer  = require('inquirer');


var templates   = require( './iron/getTemplates' )();
var questions   = require( './iron/questions.js' );
var solutions   = require( './iron/solutions.js' );


inquirer.prompt( questions, function( answers ){
    solutions( answers );
});
