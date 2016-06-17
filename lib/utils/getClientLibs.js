
var shell               = require('shelljs');
var pathToProjectRoot   = require('./pathToProjectRoot');


function findClientLibs( cb ){

    var dir             = shell.pwd();

    var recursive       = require('recursive-readdir');
    var fs              = require('fs');
    var libs            = [];

    recursive(dir.stdout,
        [
            'node_modules',
            '*.js',
            '*.jsp',
            '*.png',
            '*.gif',
            '*.java',
            '*.groovy',
            '*.jpeg',
            '*.class',
            'target',
            '.git*',
            '*.json',
            '.DS_Store',
            'README.md',
            '*.template'
        ], function (err, files) {
            // Files is an array of filename
            // console.log(files);
            for( var i = 0; i < files.length; i++ ){

                var file = files[i];

                if( file.search( '.content.xml' ) != -1 && file.search( '.content.xml.template' ) == -1 ){

                    var xml = fs.readFileSync( file ).toString();

                    if( xml.search('jcr:primaryType="cq:ClientLibraryFolder"') != -1 ){

                        // Find the "categories=" place in the string and then grab the actuall categories
                        var categories  = xml.substr( xml.search('categories=') + 13 , xml.search(']') - xml.search('categories=') - 13 ).split(",")
                        var path        = file.substr( pathToProjectRoot().length ).split('/');

                        path = path.splice(0, path.length - 1 );

                        libs.push({
                            name : categories[0],
                            path : path.join('/')
                        });

                        // TODO: add in support for mutiple categories
                        // for( var x = 0; x < categories.length; x++ ){
                        //
                        //     libs.push( categories[x] );
                        //
                        // }

                    }

                }

            }

            cb( libs )

    });

}


module.exports = findClientLibs;
