
var match           = require( './api/bundles/match-maker' );
var bundles_get     = require( './api/bundles/get' );
var update          = require( './api/update' );

module.exports = {
    bundles : {
        match : match,
        get   : bundles_get
    },
    update  : update
}
