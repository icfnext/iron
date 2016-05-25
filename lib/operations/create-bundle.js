var shell       = require( 'shelljs' );
var rc          = require( 'rc' );
var inquirer    = require( 'inquirer' );
var fs          = require( 'fs' );

var utils           = require( '../utils' );
var makeClientLib   = require( './create-clientlib' );

module.exports = function( program ){

    //make sure we are in the project iron build folder
    utils.pathToProjectRoot();
    var givenBundleName = false;

    if( program.clientlib !== true && program.clientlib !== false ){
        givenBundleName = program.clientlib;
    }

    var ironRc      = rc( 'iron' );
    var templates   = utils.get.templates();
    var bundlePath  = '';
    var bundleInfo  = {
        bundle_name : givenBundleName ? givenBundleName : program.bundle
    };

    shell.mkdir( 'aem-bundles/' + bundleInfo.bundle_name );
    shell.mkdir( 'aem-bundles/' + bundleInfo.bundle_name + '/styles' );
    shell.cd( 'aem-bundles/' + bundleInfo.bundle_name );

    bundlePath = shell.pwd().stdout;

    bundleInfo.bundle_name = bundleInfo.bundle_name
    bundleInfo.clientLibPath = '../' + ironRc.clinetlib_root + '/' + bundleInfo.bundle_name;
    bundleInfo.components = [ ];

    utils.templateRenderer( bundlePath + '/' + bundleInfo.bundle_name + '.js', templates.bundles.mainJs.value, bundleInfo )
    utils.templateRenderer( bundlePath + '/styles/' + bundleInfo.bundle_name + '.scss', templates.bundles.mainScss.value, bundleInfo )
    utils.templateRenderer( bundlePath + '/config.json', templates.bundles.bundleConfig.value, bundleInfo )
    utils.templateRenderer( bundlePath + '/' + bundleInfo.bundle_name + '.components.js', templates.bundles.componentReferance.value, bundleInfo )
    utils.templateRenderer( bundlePath + '/styles/' + bundleInfo.bundle_name + '.components.scss', templates.bundles.componentReferanceCss.value, bundleInfo )

}
