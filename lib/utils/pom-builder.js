
var parseString = require('xml2js').parseString;
var fs          = require('fs');

var templateRenderer = require('./template-renderer');
var templates        = require('./getTemplates')();

var pomReader = function( name, parentPom, goal, build_id, feBuild_artifactId, executions ){

    parseString( parentPom, function (err, result) {

        var pomInfo = {
            modelVersion        : result.project.modelVersion[0],
            groupId             : result.project.groupId[0],
            artifactId          : result.project.artifactId[0],
            version             : result.project.version[0],
            feBuild_artifactId  : feBuild_artifactId,
            build_id            : build_id,
            feBuild_name        : name,
            execution           : [
                {
                    id : goal + " " + executions.join(" "),
                    goal : goal,
                    arguments : executions.map(function(arg){ return { arg: arg } })
                }
            ]
        }

        templateRenderer( "pom.xml" , templates.project.pom.value, pomInfo );

    });

}

module.exports = pomReader;
