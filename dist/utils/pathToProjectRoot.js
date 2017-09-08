'use strict';

var shell = require('shelljs');

module.exports = function () {

    var ironRc = require('rc')('iron');
    var currentPath = shell.pwd().stdout.split("/");
    var newPath = "";

    if (ironRc.hasOwnProperty('iron_build_root')) {
        var index = currentPath.indexOf(ironRc.iron_build_root);

        if (index !== -1) {
            currentPath = currentPath.splice(0, index + 1);
        } else {
            currentPath.push(ironRc.iron_build_root);
        }
    } else {
        currentPath.push(ironRc.iron_build_root);
    }

    newPath = currentPath.join('/') + '/';

    shell.cd(newPath);

    return newPath;
};