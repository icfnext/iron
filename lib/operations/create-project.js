var fs               = require('fs');
var shell            = require('shelljs');
var npm              = require('npm');
var inquirer         = require('inquirer');

var templates        = require('../utils/getTemplates')();
var templateRenderer = require('../utils/template-renderer');
var clientLibs       = require('../utils/getClientLibs');
var pomBuilder       = require('../utils/pom-builder');
var exit             = require('../exit');

// { project_name: 'ggp',
//   jcr_path_top_folder: 'ggp-ui',
//   jcr_root_path: true,
//   fe_build_folder: 'iron-build',
//   build_tool: 'Gulp',
//   gulp_es6: true,
//   maven_artifactId: 'iron-build',
//   maven_task: 'iron-build-ui',
//   maven_goal: 'gulp',
//   maven_exacutions: 'build' }

module.exports = function( program ){

    var currentDir = shell.pwd().stdout.split("/")[ shell.pwd().stdout.split("/").length - 1 ];

    var config = {
        name                : program.args[0],
        default_components  : [],
        iron_build_root     : program.args[0] + '-iron-fe'
    };

    shell.mkdir( config.iron_build_root );
    shell.mkdir( config.iron_build_root + '/components' );
    shell.mkdir( config.iron_build_root + '/aem-bundles' );
    shell.cd( config.iron_build_root );

    npm.load( function(){

        npm.init( function(){

            clientLibs( function( libs ){

                shell.cd( '..' );

                if( libs[0] ){
                    var clientlibsPath      = libs[0].path.split( "/" );
                    config.clinetlib_root   = clientlibsPath
                                                .splice( 0, clientlibsPath.indexOf('clientlibs') + 2 )
                                                .join('/');

                    fs.writeFileSync( '.ironrc' , config);
                } else {

                    var nodeDir = require('node-dir');
                    nodeDir.subdirs(shell.pwd().stdout, function (err, subdirs) {
                        // Files is an array of filename

                        var index = subdirs.findIndex( function( filePath ){
                            var pathArray   = filePath.split('/');
                            var foundAt     = pathArray.indexOf("clientlibs");

                            return (foundAt !== -1);
                        } );

                        var clientlibFullPath = subdirs[index].split('/');
                        config.clinetlib_root = clientlibFullPath
                                                    .splice( clientlibFullPath
                                                                .indexOf( currentDir ) + 1 )
                                                    .join('/');

                        fs.writeFileSync( '.ironrc' , JSON.stringify( config, null, 4 ) );

                    } )

                }

            } );

        } )

    } )




}
