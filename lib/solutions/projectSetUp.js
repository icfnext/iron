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

module.exports = function( answers ){

    console.log(answers);

    clientLibs( function( libs ){

        var project = {};
        var cwd     = shell.pwd();

        project.name = answers.project_name;



        if( answers.use_css_preprocessor === true ){

            project.css_preprocessor = answers.css_preprocessor;

        } else {

            project.css_preprocessor = false;

        }

        project.root                = shell.pwd().split('/')[ shell.pwd().split('/').length - 1 ];
        project.build_root          = answers.fe_build_folder;
        project.build_tool          = answers.build_tool;
        project.default_components  = [];

        // fs.writeFileSync( '.ironrc', JSON.stringify( project, {}, 4 ) );

        console.log(libs);
        console.log(project);

        shell.mkdir(answers.fe_build_folder);
        shell.cd(answers.fe_build_folder);
        shell.mkdir("client-libraries");
        shell.mkdir("components");
        shell.mkdir("build-tasks");

        var nodeDeps = [
            "iron-fe"
        ];

        if( answers.build_tool === 'gulp' ){

            nodeDeps = [
                "autoprefixer-core",
                "babel",
                "babelify",
                "browserify",
                "event-stream",
                "gulp",
                "gulp-rename",
                "gulp-sass",
                "postcss",
                "vinyl-source-stream"
            ]

        }

        npm.load( function(){

            npm.commands.install("", nodeDeps, function( err ){

                if( err ){
                    console.error(err);
                }


                try {
                    var parentPom       = fs.readFileSync('../pom.xml').toString();

                    pomBuilder(
                        project.name,
                        parentPom,
                        answers.maven_goal,
                        answers.maven_exacutions.split(" ") );

                } catch( err ){
                    console.error( "Your project does not have a parent pom file!" );
                }

                if( answers.build_tool === 'gulp' ){

                    if( answers.gulp_es6 === true ){
                        fs.writeFileSync( 'gulpfile.babel.js', templates.gulp['gulp-es6'].value );
                    } else {
                        fs.writeFileSync( 'gulpfile.js', templates.gulp['gulp'].value );
                    }

                    templateRenderer( 'build-tasks/browserify.js', templates.gulp['browserify'].value, {} );
                    templateRenderer( 'build-tasks/sass.js', templates.gulp['sass'].value, {} );
                    templateRenderer( 'build-tasks/watch-browserify.js', templates.gulp['watchBrowserify'].value, {} );
                    templateRenderer( 'build-tasks/watch-sass.js', templates.gulp['watchSass'].value, {} );
                    templateRenderer( 'build-tasks/move-to-cq.js', templates.gulp['moveToCQ'].value, {} );

                }

                shell.cd( cwd );

                exit();

            })
        } )

    } )

}
