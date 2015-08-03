var gulp 		 = require( 'gulp' );

function watchBrowserifyTask() {

	var sassToWatch = [
		"./components/**/styles/**/**.scss",
		"./client-libraries/**/styles/**/**.scss"
	]

	gulp.watch( sassToWatch, ['sass'] );

}


module.exports = watchBrowserifyTask;
