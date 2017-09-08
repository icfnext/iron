'use strict';

var fs = require('fs');
var shell = require('shelljs');
var pathToProjectRoot = require('./pathToProjectRoot');

module.exports = {

    init: function init() {

        var config = require('rc')('iron', {
            defaultComponents: {},
            projectPath: "",
            templates: {}
        });

        var rcResult = {};
        rcResult.exists = config.configs ? true : false;

        if (rcResult.exists) {
            var configProps = ["config", "configs"];
            rcResult.config = config;

            configProps.filter(function (prop) {
                if (rcResult.config.hasOwnProperty(prop)) delete rcResult.config[prop];
            });
        }

        return rcResult;
    },

    update: function update(updatedRc) {

        // shell.cd( pathToProjectRoot() );

        if (updatedRc._) delete updatedRc._;
        if (updatedRc.s) delete updatedRc.s;
        if (updatedRc.configs) delete updatedRc.configs;
        if (updatedRc.config) delete updatedRc.config;

        fs.writeFileSync('.ironrc', JSON.stringify(updatedRc, {}, 4));
    }

};