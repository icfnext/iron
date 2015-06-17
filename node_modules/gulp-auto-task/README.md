# gulp-auto-task

Automatically create gulp tasks from node modules from a glob pattern.

## Installation

```
npm install gulp-auto-task
```

## Including

```
require('gulp-auto-task');
```

## Usage

Simply call it as a function passing in your a glob pattern and an optional options object.

```js
var gulp = require('gulp');
var gulpAutoTask = require('./build/lib/auto-task');

gulpAutoTask('{*,**/*}.js', {
    // This is prepended to the glob pattern and excluded from the task name.
    base: './build/gulp',

    // The gulp instance you want it applied to. If not specified this tries
    // to `require('gulp')` for you.
    gulp: gulp
});
```

And in `./build/gulp/my-task.js`

```js
module.exports = function myTask () {
  // do something tasky
};
```

### Why?

Several reasons.

1. All your tasks become *true* modules. No more `gulp.task` inside of your module.
2. Since they're now just normal modules that export functions, they can be reused.
3. Enforces usage of good, existing conventions.
4. Finding a task is easy because it is based off the file path. No more "where the f**k is that task?" because it's nested in some file with a bunch of other tasks.
5. Small `gulpfile`.
6. Use something like https://github.com/pahen/madge to map your dependencies.

### Defining Task Dependencies

You can define dependencies for a task in the normal, could-be-better, Gulp way using names. To do this, add a `deps` array to your task function:

```js
function myTask () {
  // tasky task
}

myTask.deps = ['task1', 'task2'];
```

However, this is not recommended. Why you ask? Because:

1. Want to find out why some task was run but it's not a direct dependency of the task you currently ran? Follow the dependency chain. Manually.
2. Do you have multiple tasks per file? Good luck.
3. Your tasks are run in parallel. Good for lots of things, but not everything.
4. If you want to run your tasks in serial, you must go and return explicitly from the task. Wait now that task can't be reused to run in parallel.

If you don't mind those things, that's cool. It's there for you to use. But... there's a better way.

### Using with [mac](https://github.com/treshugart/mac)

Mac gives you a way to chain a bunch of Gulp streams in parallel, or in series, using only the task function you've defined. The only thing you've got to make sure that you do is to return your stream from your task and it can be reused wherever.

Check out the [build example](https://github.com/treshugart/mac#build-example) for more information.
