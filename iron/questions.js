var fs    = require('fs'),
    path  = require('path'),
    shell = require('shelljs');

function validateComponentName( data ) {

    var pwd = shell.pwd() + '/components/html/content/';
    var dirs = fs.readdirSync( pwd ).filter( function( file ) {
        return fs.statSync( path.join( pwd, file ) ).isDirectory();
    });

    if ( dirs.indexOf(data) !== -1 ){
        return 'Name already in use, please enter a unique name';

    } else { return true; }
}

module.exports = [
    {
        type    : 'input',
        name    : 'component_name',
        message : 'What\'s the name of your component?',
        validate: validateComponentName
    },
    {
        type    : 'confirm',
        name    : 'do_css',
        message : 'Generate a SCSS file?',
        default : 'yes'
    },
    {
        type    : 'confirm',
        name    : 'do_js',
        message : 'Generate a JS file?',
        default : 'yes'
    }
];
