var shell       = require( 'shelljs' );
var rc          = require( 'rc' );
var inquirer    = require( 'inquirer' );
var fs          = require( 'fs' );

var utils           = require( '../utils' );
var makeClientLib   = require( './create-clientlib' );

module.exports = function( program ){

    if( program.component === true ) throw "Please pass a component name!! (EX: iron -c myNewComponent)"

    //make sure we are in the project iron build folder
    utils.pathToProjectRoot();

    var ironRc      = rc( 'iron' );
    var templates   = utils.get.templates();
    var componentPath  = '';
    var componentInfo  = {
        component_name : program.component
    };

    shell.mkdir( 'components/' + componentInfo.component_name );
    shell.mkdir( 'components/' + componentInfo.component_name + '/styles' );
    shell.cd( 'components/' + componentInfo.component_name );

    componentPath = shell.pwd().stdout;

    if( program.es6 ){
        utils.templateRenderer( componentPath + '/' + componentInfo.component_name + '.js', templates.components.mainJSEs6.value, componentInfo )
    } else {
        utils.templateRenderer( componentPath + '/' + componentInfo.component_name + '.js', templates.components.mainJS.value, componentInfo )
    }

    utils.templateRenderer( componentPath + '/styles/' + componentInfo.component_name + '.scss', templates.components.mainSCSS.value, componentInfo )


}
