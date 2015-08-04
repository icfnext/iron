var gulp 		= require( 'gulp' );

function watchBrowserifyTask() {

	var jsToWatch = [
		"components/**/**.js",
		"client-libraries/**/**.js",
		"!components/**/node_modules",
		"!aem-templates/**/node_modules"
	]

	gulp.watch( jsToWatch, ['browserify'] );

}


module.exports = watchBrowserifyTask;
