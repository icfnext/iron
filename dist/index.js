'use strict';

var match = require('./api/bundles/match-maker');
var bundles_get = require('./api/bundles/get');
var utils = require('./utils');

module.exports = {
    bundles: {
        match: match,
        get: bundles_get,
        buildComponentTree: utils.componentLinker
    }
};