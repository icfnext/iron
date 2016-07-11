
var path        = require('path')
var fs          = require('fs');
var shell       = require('shelljs')
var installPath = require('get-installed-path')

var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};

var readDir = function( path ) {

    var dir = fs.readdirSync( path )
        .filter( function ( dir ) {
            // return true if `dir` does not start with a `.`
            // to avoid dotfiles causing ENOTDIR (not a directory) errors
            return !dir.match( /^\.[\w -]/ );
        } );

    return dir;
}

function buildTemplatesObject (){

    var templates = {};

    var ironPath = require.resolve('iron-fe')
                        .split('/')
                        .splice( 0, require.resolve('iron-fe')
                                           .split('/').length - 2 )
                        .join('/');

    var templateTypesList = readDir( ironPath + "/lib/templates" );

    for( var i = 0; i < templateTypesList.length; i++ ){

        var currentTemplateTypeToBePassed = templateTypesList[ i ];

        ( function( templateType ) {

            var templatesList           = readDir( ironPath + "/lib/templates/" + templateType );
            templates[ templateType ]   = {};
            var currentTemplateType     = templates[ templateType ];

            for( var z = 0; z < templatesList.length; z++ ){

                var currentTemplateToBePassed = templatesList[ z ];

                (function ( templateRaw , type ){

                    var templateName    = templateRaw.split(".").splice(0,1)[0];
                    var templatePath    = fixPath( ironPath + "/lib/templates/" + type + "/" + templateRaw );
                    var templateType    = templateRaw.split(".").splice(1,1)[0]
                    var template        = {
                        path : templatePath,
                        type : templateType,
                        name : templateName,
                        value: fs.readFileSync( templatePath ).toString( )
                    }

                    currentTemplateType[ templateName ] = template;

                })( currentTemplateToBePassed , templateType );

            }

        } )( currentTemplateTypeToBePassed );

    }

    return templates;

};

module.exports = buildTemplatesObject;
