
var match           = require( './api/bundles/match-maker' );
var bundles_get     = require( './api/bundles/get' );
var utils           = require( './utils' );
var pkg             = require( '../package.json' )

module.exports = {
    version : pkg.version,
    bundles : {
        match               : match,
        get                 : bundles_get,
        buildComponentTree  : utils.componentLinker
    }
}
