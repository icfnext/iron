'use strict';

var shell = require('shelljs');
var templates = require('./getTemplates')();
var templateRenderer = require('./template-renderer');

function linker() {
    var ironApi = require('../index');
    var ironrc = require('rc')('iron');
    var bundles = ironApi.bundles.get.all().bundles;

    for (var i = 0; i < bundles.length; i++) {

        var bundle = bundles[i];
        var filePathJs = "aem-bundles/" + bundle.name + "/" + bundle.name + ".components.js";
        var filePathStyles = "aem-bundles/" + bundle.name + "/styles/" + bundle.name + ".components." + ironrc.style_language;

        var componentReferanceJs = ironrc.templateConfigs.bundles.componentReferance.js;
        var componentReferanceScss = ironrc.templateConfigs.bundles.componentReferance.scss;

        // create the import files for both styles and js so the components can be referanced
        templateRenderer(filePathJs, templates.bundles.js[componentReferanceJs].value, bundle.config);
        templateRenderer(filePathStyles, templates.bundles.scss[componentReferanceScss].value, bundle.config);
    }
}

module.exports = linker;