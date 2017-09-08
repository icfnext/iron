
var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;
var builder = new xml2js.Builder();
var fs          = require('fs');

var templateRenderer = require('./template-renderer');
var templates        = require('./getTemplates')();


var pomReader = function( name, parentPom, buildRoot ){

    parseString( parentPom, function (err, result) {

        var pPom = result.project;
        pPom.modules[0].module.splice(0,0, name + '-iron-fe' );

        var pomInfo = {
            modelVersion        : pPom.modelVersion[0],
            groupId             : pPom.groupId[0],
            artifactId          : pPom.artifactId[0],
            version             : pPom.version[0],
            feBuild_artifactId  : 'iron-build',
            build_id            : 'iron-build-ui',
            feBuild_name        : name,
            execution           : [
                {
                    id : 'install-build',
                    goal : 'npm',
                    arguments : ['test']
                }
            ]
        };

        templateRenderer( buildRoot + "/pom.xml" , templates.project.xml.ironDefaultPom.value, pomInfo );

        var newParentXML = builder.buildObject(result);
        fs.writeFileSync( 'pom.xml' , newParentXML);

    });

}

module.exports = pomReader;
