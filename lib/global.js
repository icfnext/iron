

var program         = require( 'commander' );
var chalk           = require( 'chalk' );

var package         = require( '../package.json' );
var createClientLib = require( './operations/create-clientlib' );
var createComponent = require( './operations/create-component' );
var createProject   = require( './operations/create-project' );
var createBundle    = require( './operations/create-bundle' );
var editRc          = require( './operations/edit-ironrc.js' );

module.exports = function( ){

    var rc        = require('./utils/manageRC');
    var config    = rc.init();

    if( config.exists ){

        program
            .version( package.version )
            .option( '-c, --component [name]', 'Create a component with specified name' )
            .option( '-6, --es6', 'Add -es6 after the component command to use es6 syntax in your components' )
            .option( '-b, --bundle [name]', 'Create an AEM bundle with a specified name' )
            .option( '-l, --clientlib [name]', 'Create a Client Library with a specified name' )
            .option( '-s, --set_style_language [arg]', 'Set the style_language for the project' )
            .parse( process.argv );

        if( program.component ) createComponent( program );
        if( program.bundle ) createBundle( program );
        if( program.clientlib ) createClientLib( program );
        if( program.set_style_language ) editRc.changeStyleLanguage( program.set_style_language )

        if( !program.component && !program.clientlib && !program.bundle && !program.set_style_language ) {
            console.log( chalk.red.bold( "\n[ ERROR ] No argument supplied" ) );
            console.log( chalk.yellow( "if you need help use: " ) + 'iron -h \n');
        }

    } else {

        program
            .version( package.version )
            .option('[name]', 'Give your project a name')
            .parse(process.argv);

        if( program.args[0] ){
            createProject( program );
        } else {
            console.log( chalk.red.bold( "[ ERROR ] No argument for project name" ) + '\n' + chalk.yellow( "Please supply Iron with a project name for example: " ) + 'iron myProject \n' );
        }
    }


}
