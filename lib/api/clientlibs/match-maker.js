
var ironRc = require('rc')('iron');

var clientLibraryMatchMaker = function( fileObject ){

    if( fileObject.path ){

        var pathArray       = fileObject.path.split("/");
        var componentName   = pathArray.splice( pathArray.length - 2 , 1).join('');

        var matchinglibs = [];

        for (var i = 0; i < ironRc.clientlibraries.length; i++) {
            var lib = ironRc.clientlibraries[i];
            for (var z = 0; z < lib.components.length; z++) {
                var libComponentName = lib.components[z].name;

                if( libComponentName === componentName ){
                    matchinglibs.push( lib );
                }
            }
        }

        return matchinglibs;

    }

}

module.exports = clientLibraryMatchMaker;
