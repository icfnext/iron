
var rc        = require('rc');
var fs        = require('fs');

var config = require('rc')('iron', {
    defaultComponents   : {},
    projectPath         : "",
    templates           : {}
});



module.exports = {

    init : function(){

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
