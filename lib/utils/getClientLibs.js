
function findClientLibs(){

    var dir = '/Users/33106/Dropbox/Sites/CITYTECH/repos/ggp';

    var recursive = require('recursive-readdir');
    var parseString = require('xml2js').parseString;
    var fs      = require('fs');

    recursive('/Users/33106/Dropbox/Sites/CITYTECH/repos/ggp',
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

        if( file.search( '.content.xml' ) != -1 ){

            var xml = fs.readFileSync( file );

            parseString(xml, function (err, result) {


                if( result['jcr:root']['$']['jcr:primaryType'] == 'cq:ClientLibraryFolder' ){

                    console.dir(result);

                }

            });

        } 



      }


    });

}

findClientLibs();

module.exports = findClientLibs;
