var gulp 			 = require( 'gulp' );
var browserify 		 = require( 'browserify' );
var iron			 = require( 'iron' );
var path			 = require( 'path' );
var source           = require( 'vinyl-source-stream' );
var rename           = require( 'gulp-rename' );
var es               = require( 'event-stream' );
var sass 			 = require( 'gulp-sass' );
var postcss			 = require( 'postcss' );
var autoprefixer	 = require( 'autoprefixer-core' );


function sassTask(  ) {

	let librariesToCompile = iron.clientlibraries.get.all();

    // map them to our stream function
    var tasks = librariesToCompile.map(function(lib) {
        return gulp.src(lib.entry.style)
            .pipe(sass())
            // rename them to have "bundle as postfix"
            .pipe(rename({
                extname: '.bundle.css'
            }))
            .pipe(gulp.dest( lib.path + "/build/css" ))
			.on('end', function(){
				console.log("		Bundled " + lib.name);
			});
        });
    // create a merged stream
    return es.merge.apply(null, tasks);


}


module.exports = sassTask;
