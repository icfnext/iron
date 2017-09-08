'use strict';

var shell = require('shelljs');
var rc = require('rc');

var utils = require('../utils');

module.exports = function (program) {

    //make sure we are in the project iron build folder
    utils.pathToProjectRoot();
    var givenBundleName = false;

    if (program.clientlib !== true && program.clientlib !== false) {
        givenBundleName = program.clientlib;
    }

    var ironRc = rc('iron');
    var templates = utils.get.templates();
    var bundlePath = '';
    var bundleInfo = {
        bundle_name: givenBundleName ? givenBundleName : program.bundle
    };

    shell.mkdir('aem-bundles/' + bundleInfo.bundle_name);
    shell.mkdir('aem-bundles/' + bundleInfo.bundle_name + '/styles');
    shell.cd('aem-bundles/' + bundleInfo.bundle_name);

    bundlePath = shell.pwd().stdout;

    bundleInfo.bundle_name = bundleInfo.bundle_name;
    bundleInfo.clientLibPath = '../' + ironRc.clientlib_root + '/' + bundleInfo.bundle_name;
    bundleInfo.components = [];

    var mainEntryJsName = ironRc.templateConfigs.bundles.entry.js;
    var mainEntryScssName = ironRc.templateConfigs.bundles.entry.scss;
    var config = ironRc.templateConfigs.bundles.config;
    var componentReferanceJs = ironRc.templateConfigs.bundles.componentReferance.js;
    var componentReferanceScss = ironRc.templateConfigs.bundles.componentReferance.scss;

    utils.templateRenderer(bundlePath + '/main.' + bundleInfo.bundle_name + '.js', templates.bundles.js[mainEntryJsName].value, bundleInfo);
    utils.templateRenderer(bundlePath + '/styles/' + bundleInfo.bundle_name + '.scss', templates.bundles.scss[mainEntryScssName].value, bundleInfo);
    utils.templateRenderer(bundlePath + '/config.json', templates.bundles.json[config].value, bundleInfo);
    utils.templateRenderer(bundlePath + '/' + bundleInfo.bundle_name + '.components.js', templates.bundles.js[componentReferanceJs].value, bundleInfo);
    utils.templateRenderer(bundlePath + '/styles/' + bundleInfo.bundle_name + '.components.scss', templates.bundles.scss[componentReferanceScss].value, bundleInfo);
};