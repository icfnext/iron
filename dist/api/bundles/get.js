'use strict';

var rc = require('rc');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var chalk = require('chalk');

var utils = require('../../utils');

module.exports = {

	getBundles: function getBundles() {
		// Make sure we are at the iron build root
		utils.pathToProjectRoot();

		var bundlesArray = fs.readdirSync('aem-bundles').filter(function (dir) {
			// return true if `dir` does not start with a `.`
			// to avoid dotfiles causing ENOTDIR (not a directory) errors
			return !dir.match(/^\.[\w -]/);
		});

		return bundlesArray;
	},

	all: function all() {

		var bundlesArray = this.getBundles();

		var bundles = {
			bundleNames: [],
			bundleCount: bundlesArray.length,
			bundlePaths: [],
			bundles: []
		};

		for (var i = 0; i < bundlesArray.length; i++) {

			var bundle = this.one(bundlesArray[i]);
			bundles.bundles.push(bundle);
			bundles.bundleNames.push(bundle.name);
		}

		return bundles;
	},
	one: function one(bundleName) {

		var bundlesArray = this.getBundles().filter(function (dir) {
			return dir === bundleName;
		});

		var bundle = {
			components: []
		};

		bundle.name = bundlesArray[0];
		bundle.path = 'aem-bundles/' + bundle.name;
		bundle.main = 'main.' + bundle.name + ".js";

		var hasConfig = fs.existsSync('./' + bundle.path + '/config.json');

		if (hasConfig) {
			bundle.config = require(shell.pwd().stdout + '/' + bundle.path + '/config.json');
		} else {
			var error = 'Confg json file is required. Your bundle located here: ' + chalk.bgRed.white(bundle.path) + ' is missing the config. Add one or delete the folder';
			console.log(error);
		}

		if (fs.existsSync(path.resolve(bundle.config.clientLibPath))) {
			bundle.config.clientLibPath = path.resolve(bundle.config.clientLibPath);
		} else {
			var _error = 'Please defign a valid path to the bundle\'s clientlib in the config.json for : ' + chalk.bgRed.white(bundle.path);
			throw _error;
		}

		for (var i in bundle.config.components) {

			var component = bundle.config.components[i];

			bundle.components.push({
				name: component,
				isGlobal: component === 'global'
			});
		}

		return bundle;
	}

};