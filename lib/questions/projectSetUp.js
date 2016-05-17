var shell       = require('shelljs');
var fs          = require('fs');
var path        = require('path');
var clientLibs  = require('../utils/getClientLibs');

module.exports = [
    {
        type 	: "input",
        name 	: "project_name",
        message : "What is the name of this project?"
    },
    {
        type    : "input",
        name    : "fe_build_folder",
        message : "What do you want your front end build folder to be named? (Default: iron-build)",
        default : "iron-build"
    },
    {
        type    : "list",
        name    : "build_tool",
        message : "What build tool do you want to use?",
        choices : ["gulp", "Build Your Own"]
    },
    {
        type    : "confirm",
        name    : "gulp_es6",
        message : "Do you want to write your gulp tasks in ES2016",
        when    : function( answers ){
            return answers.build_tool === 'gulp';
        }
    },
    {
        type    : "confirm",
        name    : "use_css_preprocessor",
        message : "Do you want to use a css preprocessor?",
        default : true
    },
    {
        type    : "list",
        name    : "css_preprocessor",
        message : "What build tool do you want to use?",
        choices : ["less", "scss", "stylus"],
        when    : function( answers ){
            return answers.use_css_preprocessor === true;
        }
    },
    {
        type    : "input",
        name    : "maven_goal",
        message : "What is the first argument in the node execution? (EX: npm, node, gulp, grunt)"
    },
    {
        type    : "input",
        name    : "maven_exacutions",
        message : "What tasks do you want node to run? Seperate your argumnets by a space (EX : install -g)",
        default : "build"
    }
]

function readRootProjectDirs (){
    return fs.readdirSync(shell.pwd()).filter(function(file) {
        if( file != '.git' && file != 'node_modules' ){
            return fs.statSync(path.join(shell.pwd(), file)).isDirectory();
        }
    });
}
