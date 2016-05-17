var shell = require( 'shelljs' );


module.exports = function( ) {

    var ironRc      = require( 'rc' )( 'iron' );
    var currentPath = shell.pwd().split("/");
    var newPath     = "";

    if( ironRc.hasOwnProperty( 'root' ) ){
        var ggpIndex    = currentPath.indexOf( ironRc.root );
        newPath         = currentPath.splice(0, ggpIndex + 1).join('/') + "/";
    } else {
        newPath         = currentPath.join('/') + "/";
    }

    return newPath;

}
