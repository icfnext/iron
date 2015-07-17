
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
            //console.log("has config", config);
            hadConfig = true;
        } else {
            //fs.writeFileSync(".ironrc", JSON.stringify(config, {}, 4) );
            //console.log("no config");
        }

        return hadConfig ? config : hadConfig;

    },

    update : function(){



    }


}
