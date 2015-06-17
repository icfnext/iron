var gulp      = require('gulp');
var inquirer  = require('inquirer');
var questions = require('../iron/questions.js');
var solutions = require('../iron/solutions.js');

module.exports = function(){
    inquirer.prompt( questions, function( answers ){ 
        solutions( answers ); 
    });
}
