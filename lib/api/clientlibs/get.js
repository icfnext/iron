

module.exports = {

    all : function(){

        var ironRc = require('rc')('iron');

        return ironRc.clientlibraries;

    },
    one : function( libName ){

        var ironRc = require('rc')('iron');

        for (var i = 0; i < ironRc.clientlibraries.length; i++) {

            var lib = ironRc.clientlibraries[i];

            if( lib.name === libName ){
                return lib;
            }

        }

    }

}
