

var program         = require( 'commander' );
var chalk           = require( 'chalk' );

var createClientLib = require( './operations/create-clientlib' );
var createComponent = require( './operations/create-component' );
var createProject   = require( './operations/create-project' );
var createBundle    = require( './operations/create-bundle' );


module.exports = function( ){

    var rc        = require('./utils/manageRC')
    var config    = rc.init();


    if( config.exists ){

        program
            .version('2.0.0')
            .option('-c, --component [name]', 'Create a component with specified name')
            .option('-b, --bundle [name]', 'Create a AEM bundle with specified name')
            .option('-l, --clinetlib [name]', 'Create a Clinet Library with specified name')
            .parse(process.argv);

        if( program.component ) createComponent( program );
        if( program.bundle ) createBundle( program );
        if( program.clinetlib ) createClientLib( program );

        if( !program.component && !program.clinetlib && !program.bundle ){
            console.log( chalk.red.bold( "\n[ ERROR ] No argument supplied" ) );
            console.log( chalk.yellow( "if you need help use: " ) + 'iron -h \n');
        }


    } else {

        program
            .version('2.0.0')
            .option('[name]', 'Give your project a name')
            .parse(process.argv);

        if( program.args[0] ){
            createProject( program );
        } else {
            console.log( chalk.red.bold( "[ ERROR ] No argument for project name" ) + '\n' + chalk.yellow( "Please supply Iron with a project name for example: " ) + 'iron myProject \n' );
        }
    }


}
