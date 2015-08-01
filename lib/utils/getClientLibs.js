
function findClientLibs( cb ){

    var dir = '/Users/33106/Dropbox/Sites/Personal/Personal Repos/iron/test/ggp';

    var recursive       = require('recursive-readdir');
    var fs              = require('fs');
    var libs            = [];

    recursive(dir,
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

            for( var i = 0; i < files.length; i++ ){

                var file = files[i];

                if( file.search( '.content.xml' ) != -1 && file.search( '.content.xml.template' ) == -1 ){

                    var xml = fs.readFileSync( file ).toString();

                    if( xml.search('jcr:primaryType="cq:ClientLibraryFolder"') != -1 ){

                        // Find the "categories=" place in the string and then grab the actuall categories
                        var categories = xml.substr( xml.search('categories=') + 13 , xml.search(']') - xml.search('categories=') - 13 ).split(",")

                        for( var x = 0; x < categories.length; x++ ){

                            libs.push( categories[x] );

                        }

                    }

                }

            }

            cb( libs )

    });

}


module.exports = findClientLibs;
