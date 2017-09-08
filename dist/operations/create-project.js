'use strict';

var fs = require('fs');
var shell = require('shelljs');
var npm = require('npm');
var inquirer = require('inquirer');

var templates = require('../utils/getTemplates')();
var templateRenderer = require('../utils/template-renderer');
var clientLibs = require('../utils/getClientLibs');
var pomBuilder = require('../utils/pom-builder');

function buildCatArray(catArray) {

    var upperCassedCatArray = catArray.map(function (cat, index) {
        if (index !== 0) {
            return cat.charAt(0).toUpperCase() + cat.slice(1);
        } else {
            return cat;
        }
    });

    return upperCassedCatArray;
}

function createClientLibBaseCat(projectName) {

    var hasDash = projectName.indexOf("-");
    var hasUnderscore = projectName.indexOf("_");

    if (hasDash !== -1) {
        projectName = projectName.split('-');
        return buildCatArray(projectName).join('');
    }

    if (hasUnderscore !== -1) {
        projectName = projectName.split('_');
        return buildCatArray(projectName).join('');
    }
}

module.exports = function (program) {

    var currentDir = shell.pwd().stdout.split("/")[shell.pwd().stdout.split("/").length - 1];

    var config = {
        name: program.args[0],
        // default_components  : [],
        iron_build_root: program.args[0] + '-iron-fe',
        style_language: 'scss',
        templateConfigs: {
            customTemplates: true,
            customTemplatesPath: "iron-templates",
            bundles: {
                componentReferance: {
                    js: 'ironDefaultComponentReferance',
                    scss: 'ironDefaultComponentReferance'
                },
                config: 'ironDefaultConfig',
                entry: {
                    js: 'ironDefaultMainEntry',
                    scss: 'ironDefaultMainEntry'
                }
            },
            clientlibs: {
                content: 'ironDefaultContent',
                text: {
                    js: 'ironDefaultJs',
                    css: 'ironDefaultCss'
                }
            },
            components: {
                js: 'ironDefault',
                scss: 'ironDefault'
            }
        }
    };

    config.clientlib_base_category = createClientLibBaseCat(config.name);

    try {
        var parentPom = fs.readFileSync('pom.xml').toString();

        pomBuilder(config.name, parentPom, config.iron_build_root);
    } catch (err) {
        console.error("Your project does not have a parent pom file!", err);
    }

    shell.mkdir(config.iron_build_root);
    shell.mkdir(config.iron_build_root + '/components');
    shell.mkdir(config.iron_build_root + '/aem-bundles');

    // Make Iron templates directory
    shell.mkdir(config.iron_build_root + '/iron-templates');
    shell.mkdir(config.iron_build_root + '/iron-templates/bundles');
    shell.mkdir(config.iron_build_root + '/iron-templates/clientlibs');
    shell.mkdir(config.iron_build_root + '/iron-templates/components');

    shell.cd(config.iron_build_root);

    npm.load(function () {

        npm.init(function () {
            clientLibs(function (libs) {

                if (libs.length !== 0) {
                    var clientlibsPath = libs[0].path.split("/");
                    config.clientlib_root = clientlibsPath.splice(0, clientlibsPath.indexOf('clientlibs') + 2).join('/');

                    fs.writeFileSync('.ironrc', JSON.stringify(config, null, 4));
                } else {
                    var nodeDir = require('node-dir');
                    nodeDir.subdirs(shell.pwd().stdout, function (err, subdirs) {
                        // Files is an array of filename

                        var index = subdirs.findIndex(function (filePath) {
                            var pathArray = filePath.split('/');
                            var foundAt = pathArray.indexOf("clientlibs");

                            return foundAt !== -1;
                        });

                        if (subdirs[index] === undefined) {

                            var etcIndex = subdirs.findIndex(function (filePath) {
                                var pathArray = filePath.split('/');
                                var foundAt = pathArray.indexOf("etc");

                                return foundAt !== -1;
                            });

                            var clientlibFullPath = subdirs[etcIndex].split('/');
                            config.clientlib_root = clientlibFullPath.splice(clientlibFullPath.indexOf(currentDir) + 1).join('/') + '/clientlibs';

                            shell.mkdir(config.clientlib_root);
                            templateRenderer(config.clientlib_root + '/.content.xml', templates.project.xml.ironDefaultContent.value, {});
                        } else {

                            var etcIndex = subdirs.findIndex(function (filePath) {
                                var pathArray = filePath.split('/');
                                var foundAt = pathArray.indexOf("etc");

                                return foundAt !== -1;
                            });

                            var clientlibFullPath = subdirs[etcIndex].split('/');
                            config.clientlib_root = clientlibFullPath.splice(clientlibFullPath.indexOf(currentDir) + 1).join('/') + '/clientlibs';

                            shell.mkdir(config.clientlib_root);
                        }

                        fs.writeFileSync('.ironrc', JSON.stringify(config, null, 4));
                    });
                }
            });
        });
    });
};