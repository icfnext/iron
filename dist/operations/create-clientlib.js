'use strict';

var shell = require('shelljs');
var rc = require('rc');
var inquirer = require('inquirer');
var fs = require('fs');

var utils = require('../utils');
var makeClientLib = require('./create-clientlib');

module.exports = function (program) {

    //make sure we are in the project iron build folder
    utils.pathToProjectRoot();

    shell.cd('..');

    var givenLibName = false;

    if (program.bundle !== true && program.bundle !== false) {
        givenLibName = program.bundle;
    }

    var ironRc = rc('iron');
    var templates = utils.get.templates();
    var libPath = '';
    var libInfo = {
        clientlib_name: givenLibName ? givenLibName : program.clientlib
    };

    libInfo.clientlib_category = ironRc.clientlib_base_category + '.' + libInfo.clientlib_name, libInfo.clientlib_path = './' + ironRc.clientlib_root + '/' + libInfo.clientlib_name;

    shell.mkdir(libInfo.clientlib_path);
    shell.mkdir(libInfo.clientlib_path + '/js');
    shell.mkdir(libInfo.clientlib_path + '/css');
    shell.cd(libInfo.clientlib_path);

    var jsDotText = ironRc.templateConfigs.clientlibs.text.js;
    var cssDotText = ironRc.templateConfigs.clientlibs.text.css;
    var contentXml = ironRc.templateConfigs.clientlibs.text.content;

    utils.templateRenderer('css.txt', templates.clientlibs.txt[jsDotText].value, libInfo);
    utils.templateRenderer('js.txt', templates.clientlibs.txt[cssDotText].value, libInfo);
    utils.templateRenderer('.content.xml', templates.clientlibs.xml[contentXml].value, libInfo);
};