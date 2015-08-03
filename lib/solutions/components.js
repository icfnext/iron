var inquirer    = require( 'inquirer' );
var shell       = require( 'shelljs' );
var npm         = require( 'npm' );

var templates        = require( '../utils/getTemplates' )();
var templateRenderer = require( '../utils/template-renderer' );
var rcManager        = require( '../utils/manageRC' );
var component_linker = require( '../utils/component-linker');
var exit             = require( '../exit');

module.exports = function( answers_main ){

    var ironRc = require( 'rc' )('iron');

    var newQuestions = answers_main.components_clientlibrary.map( function( lib ) {

        return {
            type    : "list",
            name    : lib.name + "_component_position",
            message : "Select the component immediately preceding " + answers_main.component_name + " in the template " + lib.name,
            choices : function( ){
                return lib.components.map(function( item ){
                    return {
                        name : item.name,
                        value : item
                    }
                })
            },
            when    : function(){
                return lib.components.length >= 1;
            },
            default : -1

        }

    } );

    inquirer.prompt( newQuestions, function( answers_secondary ){

        var cwd = shell.pwd();

        var component = {
            name            : answers_main.component_name,
            isADefault      : answers_main.component_new_default,
            clientlibraries : answers_main.components_clientlibrary.map( function (lib) {
                return lib.name;
            } )
        }


        for( var i = 0; i < answers_main.components_clientlibrary.length; i++ ){

            var componentLib = answers_main.components_clientlibrary[ i ];


            for( var z = 0; z < ironRc.clientlibraries.length; z++ ){

                var rcLib = ironRc.clientlibraries[ z ];

                if( componentLib.name === rcLib.name ){

                    if( answers_secondary[ rcLib.name + "_component_position" ] ){

                        var preceedingComponent = answers_secondary[ rcLib.name + "_component_position" ];

                        for (var x = 0; x < rcLib.components.length; x++) {

                            if( rcLib.components[x].name === preceedingComponent.name ){
                                rcLib.components.splice(x+1, 0, component);
                                break;
                            }

                        }

                    } else {

                        rcLib.components.push( component );

                    }

                }

            }

        }

        ironRc.components.push( component );

        // go to the build folders component folder
        shell.cd( ironRc.build_root + "/components" );

        // make component folder and set working directory as the new folder
        shell.mkdir( answers_main.component_name );
        shell.cd( answers_main.component_name );

        // make styles folder
        shell.mkdir( 'styles' );

        // create the main js and styles files
        templateRenderer( answers_main.component_name + ".js",
                            templates.components['mainJS'].value,
                            answers_main
                        );
        templateRenderer( "styles/" + answers_main.component_name + "." + ironRc.css_preprocessor,
                            templates.components['mainSCSS'].value,
                            answers_main
                        );


        npm.load( function(){

            npm.commands.init( function(){

                shell.cd( cwd );

                rcManager.update( ironRc );

                component_linker();

                exit();

            } );

        } );

    } )


}
