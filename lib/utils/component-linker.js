
var templates        = require('./getTemplates')();
var templateRenderer = require('./template-renderer');


function linker() {

    var ironrc = require( 'rc' )( 'iron' );

    for (var i = 0; i < ironrc.clientlibraries.length; i++) {

        var library        = ironrc.clientlibraries[i];
        var filePathJs     = ironrc.build_root + "/client-libraries/" + library.name + "/" + library.name + ".components.js";
        var filePathStyles = ironrc.build_root + "/client-libraries/" + library.name + "/styles/" + library.name + ".components." + ironrc.css_preprocessor;

        // create the import files for both styles and js so the components can be referanced
        templateRenderer( filePathJs, templates.clientlibs['componentReferance'].value, library );
        templateRenderer( filePathStyles, templates.clientlibs['componentReferanceCss'].value, library );

    }

}


module.exports = linker;
