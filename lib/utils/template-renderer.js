var fs          = require('fs');
var handlebars  = require('handlebars');
var templates   = require('./getTemplates');

module.exports = function( path , template , data ){

    var fileHB      = handlebars.compile( template );
    var template    = fileHB( data );

    fs.writeFileSync( path , template );

}
