
var path    = require('path')
var fs      = require('fs');
var shell   = require('shelljs')


var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};

module.exports = function(){

    var templates = {};

    var templatesDir = fs.readdirSync( 'lib/templates' )
		.filter( function ( dir ) {
			// return true if `dir` does not start with a `.`
			// to avoid dotfiles causing ENOTDIR (not a directory) errors
			return !dir.match( /^\.[\w -]/ );
		} );

    for( var i = 0; i < templatesDir.length; i++ ){

        (function ( templatesArray ){

            var templateRaw     = templatesArray[ i ];
            var templateName    = templateRaw.split(".").splice(0,1)[0];
            var templatePath    = fixPath( shell.pwd() + "/lib/templates/" + templateRaw );
            var templateType    = templateRaw.split(".").splice(1,1)[0]
            var template        = {
                path : templatePath,
                type : templateType,
                name : templateName,
                value: fs.readFileSync( templatePath ).toString( )
            }

            templates[ templateName ] = template;

        })(templatesDir)

    }

    return templates;

};
