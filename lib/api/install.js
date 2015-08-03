var shell = require( 'shelljs' );
var npm   = require( 'npm' );

module.exports = function( ){

    var ironRc     = require( 'rc' )( 'iron' );
    var pwd        = shell.pwd();
    var components = ironRc.components;

    shell.cd( "components" );

    install( components.pop() );

    function install ( component ){

        shell.cd( component.name );

        npm.load( function(){

            var pack = require( shell.pwd() + '/package.json');

            if( pack.dependencies ){

                var deps = Object.keys( pack.dependencies );

                npm.commands.install( deps , function(){

                    shell.cd( ".." );

                    if( components.length > 0 ){

                        install( components.pop() );

                    }

                } );

            } else {

                shell.cd( ".." );

                if( components.length > 0 ){

                    install( components.pop() );

                }

            }


        } )

    }

}
