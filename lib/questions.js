
var runQuestions = function(){

    var rc        = require('./utils/manageRC')
    var config    = rc.init();
    var questions = [];

    if( config ){

        // questions for altering or adding to existing projects
        questions = require('./questions/project');

    } else {

        // questions for initilizing the project
        questions = require('./questions/projectSetUp');

    }

    return questions;

}


module.exports = runQuestions;
