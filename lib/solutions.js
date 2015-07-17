var rc          = require('./utils/manageRC')

module.exports = function( data ){

    var config      = rc.init();

    if( config ){

        // answers for altering or adding to existing projects
        require('./solutions/project')( data );

    } else {

        // answers for initilizing the project
        require('./solutions/projectSetUp')( data );

    }

}
