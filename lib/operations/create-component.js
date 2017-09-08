var shell       = require( 'shelljs' );
var rc          = require( 'rc' );
var inquirer    = require( 'inquirer' );
var fs          = require( 'fs' );
var chalk       = require( 'chalk' );

var utils           = require( '../utils' );
var makeClientLib   = require( './create-clientlib' );

module.exports = function( program ){

    if( program.component === true ) throw "Please pass a component name!! (EX: iron -c myNewComponent)"

    //make sure we are in the project iron build folder
    utils.pathToProjectRoot();

    var ironRc        = rc( 'iron' );
    var templates     = utils.get.templates();
    var componentPath = '';
    var componentInfo = {
        ...program,
        component_name : program.component
    };

    shell.mkdir( 'components/' + componentInfo.component_name );
    shell.mkdir( 'components/' + componentInfo.component_name + '/styles' );
    shell.cd( 'components/' + componentInfo.component_name );

    componentPath = shell.pwd().stdout;

    let jsFileName  = ironRc.templateConfigs.components.js;
    let cssFileName = ironRc.templateConfigs.components[ironRc.style_language];


    try{
        utils.templateRenderer( componentPath + '/' + componentInfo.component_name + '.js', templates.components.js[ jsFileName ].value, {...componentInfo, ...templates.components.js[ jsFileName ]} )
    } catch(err) {
        throw( chalk.bold.red(`Cant find the template by the name of "${jsFileName}.js.template" in the ${ironRc.templateConfigs.customTemplatesPath}/components`) )
    }

    try {
        utils.templateRenderer( componentPath + '/styles/' + componentInfo.component_name + "." + ironRc.style_language, templates.components[ ironRc.style_language ][ cssFileName ].value, {...componentInfo, ...templates.components[ ironRc.style_language ][ cssFileName ]} )
    } catch( err ){
        throw( chalk.bold.red(`Cant find the template by the name of "${cssFileName}.${ironRc.style_language}.template" in the ${ironRc.templateConfigs.customTemplatesPath}/components`) )
    }


}
