
var match          = require( './api/clientlibs/match-maker' );
var clientLibs_get = require( './api/clientlibs/get' );
var install        = require( './api/install' );

module.exports = {
    clientlibraries : {
        match : match,
        get   : clientLibs_get
    },
    install : install

}
