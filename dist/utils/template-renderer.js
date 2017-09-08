'use strict';

var fs = require('fs-extra');
var handlebars = require('handlebars');
var templates = require('./getTemplates');

module.exports = function (path, template, data) {

    var fileHB = handlebars.compile(template);
    var template = fileHB(data);

    var pathArray = path.split('/');
    pathArray.pop();

    var fileParentFolderPath = pathArray.join('/');

    fs.ensureDirSync(fileParentFolderPath);

    fs.writeFileSync(path, template);
};