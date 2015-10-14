var fs        = require('fs');

module.exports = {

    init : function(){

        var config = require('rc')('iron', {
            defaultComponents   : {},
            projectPath         : "",
            templates           : {}
        });

        var rcResult = {};
        rcResult.exists = config.configs ? true : false;

        if( rcResult.exists ){
            var configProps = ["config", "configs"];
            rcResult.config = config;

            configProps.filter(function(prop) {
                if (rcResult.config.hasOwnProperty(prop))
                    delete rcResult.config[prop];
            });
        }

        return rcResult;
    },

    update : function( updatedRc ){

        fs.writeFileSync( '.ironrc', JSON.stringify( updatedRc, {}, 4 ) );

    }

}
