var shell   = require('shelljs');
var fs      = require('fs');
var path    = require('path');

module.exports = [
    {
        type 	: "input",
        name 	: "project_name",
        message : "What is the name of this project?"
    },
    {
        type 	: "confirm",
        name 	: "project_path",
        message : "Is this your current project path? \n " + shell.pwd()
    },
    {
        type 	: "input",
        name 	: "project_path",
        message : "What is your project path?",
        when    : function( currentAnswers ){
            return !currentAnswers.project_path;
        }
    },
    {
        type 	: "list",
        name 	: "jcr_path_top_folder",
        message : "In which folder is the jcr root located?",
        choices : readRootProjectDirs
    },
    {
        type 	: "confirm",
        name 	: "jcr_root_path",
        message : function( currenctAnswers ){
            return "Is this the location of the jcr root path? \n " +
                currenctAnswers.jcr_path_top_folder + "/src/main/content/jcr_root"
        }
    },
]

function readRootProjectDirs (){
    return fs.readdirSync(shell.pwd()).filter(function(file) {
        if( file != '.git' && file != 'node_modules' ){
            return fs.statSync(path.join(shell.pwd(), file)).isDirectory();
        }
    });
}
