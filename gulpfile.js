var gulp = require( 'gulp' );
var gulpAutoTask = require( 'gulp-auto-task' );

gulpAutoTask( '{*,**/*}.js', {
	// This is prepended to the glob pattern and excluded from the task name.
	base: './gulpTasks',

	// The gulp instance you want it applied to. If not specified this tries
	// to `require('gulp')` for you.
	gulp: gulp
});
