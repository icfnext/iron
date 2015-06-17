'use strict';

var glob = require('glob');
var gulp = require('gulp');
var path = require('path');

module.exports = function (pattern, options) {
    options = options || {};
    options = {
        base: path.resolve(options.base || './')
    };

    glob.sync(path.join(options.base, pattern)).forEach(function (file) {
        var task = require(file);
        var name = file.replace(options.base + '/', '').replace('.js', '');
        gulp.task(name, task.deps || task, task.deps ? task : undefined);
    });
};
