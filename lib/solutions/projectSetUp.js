var shell   = require('shelljs');


module.exports = function( answers ){

    var project = {};

    project.name = answers.project_name;
  //   { project_name: 'adf',
  // project_path: true,
  // jcr_path_top_folder: 'bin',
  // jcr_root_path: true }

    if( answers.project_path ){

        project.path = shell.pwd();

    }

    if( answers.jcr_root_path ){

        project.jcr_root = project.path + "/" + answers.jcr_root_path +  "src/main/content/jcr_root";

    }

    console.log(project);

}
