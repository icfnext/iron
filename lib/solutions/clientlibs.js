
/**
 * Solutions Clientlibs will generate the nessisarry files and folders for
 * a client library in AEM as well as the correct files and folders for
 * the iron build client library
 *
 * @answers {
        clientlib_aem_generate       : "Boolean",
        clientlib_name               : "String",
        clientlib_category           : "String",
        clientlib_extra_categories   : "List",
        clientlib_default_components : "Boolean",
        clientlib_components         : "List",
        clientlib_path               : "String"
    }
 *
 *
 */

 var shell              = require( 'shelljs' );
 var npm                = require( 'npm' );
 var fs                 = require( 'fs-extra' );

 var templates        = require( '../utils/getTemplates' )();
 var templateRenderer = require( '../utils/template-renderer' );
 var rcManager        = require( '../utils/manageRc');
 var component_linker = require( '../utils/component-linker');
 var exit             = require( '../exit' );


module.exports = function( answers ){
    var ironRc    = rcManager.init().config;
    var cwd       = shell.pwd();
    var styleType = ironRc.css_preprocessor !== false ? ironRc.css_preprocessor : 'css';

    var lib = {
        name                : answers.clientlib_name,
        aemPath             : answers.clientlib_root_path + answers.clientlib_path + "/" + answers.clientlib_name,
        path                : 'client-libraries/' + answers.clientlib_name + '/',
        entry               : {
            js    : 'client-libraries/' + answers.clientlib_name + '/' + answers.clientlib_name + '.js',
            style : 'client-libraries/' + answers.clientlib_name + '/styles/' + answers.clientlib_name + '.' + styleType
        },
        components          : answers.components ? answers.components : [],
        defaultComponents   : answers.clientlib_default_components,
        styleType           : styleType
    }

    // if the user wants to generate an aem client library as well
    if( answers.clientlib_aem_generate === true ){

        fs.ensureDirSync( answers.clientlib_root_path + answers.clientlib_path );

        // go to the location the user specified for the aem client lib to be created
        shell.cd( answers.clientlib_root_path + answers.clientlib_path );
        shell.mkdir( answers.clientlib_name );
        shell.cd( answers.clientlib_name );

        shell.mkdir( 'js' );
        shell.mkdir( 'css' );

        // create client lib .content.xml
        templateRenderer( shell.pwd() + "/.content.xml" , templates.clientlibs['content'].value, answers );
        // create client lib js.txt
        templateRenderer( shell.pwd() + "/js.txt" , templates.clientlibs['js'].value, answers );
        // create client lib css.txt
        templateRenderer( shell.pwd() + "/css.txt" , templates.clientlibs['css'].value, answers );

        // go back to the working folder
        shell.cd( cwd );

    }

    // create the iron-build client library folder
    shell.cd( ironRc.build_root + '/client-libraries' );
    shell.mkdir( answers.clientlib_name );
    shell.cd( answers.clientlib_name );

    // create folder for styles
    shell.mkdir( 'styles' );

    // create the main js file and the main
    templateRenderer( answers.clientlib_name + ".js" , templates.clientlibs['mainJs'].value, answers)
    templateRenderer( 'styles/' + answers.clientlib_name + "." + lib.styleType , templates.clientlibs['mainScss'].value, answers)

    //create package.json
    npm.load( function(){

        npm.commands.init(
            function(){

                shell.cd( cwd );

                ironRc.clientlibraries.push( lib );

                rcManager.update( ironRc );

                component_linker();

                exit();

            }
        );

    } );



}
