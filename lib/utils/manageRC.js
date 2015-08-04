var fs        = require('fs');

module.exports = {

    init : function(){

        var config = require('rc')('iron', {
            defaultComponents   : {},
            projectPath         : "",
            templates           : {}
        });

        var hadConfig = false;

        if( config.configs ){
            hadConfig = true;
        }

        return hadConfig ? config : hadConfig;

    } ,

    update : function( updatedRc ){

        fs.writeFileSync( '.ironrc', JSON.stringify( updatedRc, {}, 4 ) );

    }

}
