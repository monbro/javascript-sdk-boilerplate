/**
 * this is the main task runner for managing the SampleSDK
 */

/*
 * define requirements
 * ***********************************************************************************************
 */

var gulp = require('gulp');
var args   = require('yargs').argv;
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var clean = require('gulp-clean');
var bump = require('gulp-bump');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var colours = require('colors');
var fs = require('fs');
var exec = require('child_process').exec;
var sys = require('sys');
var tasklist = require('gulp-task-listing');
var runSequence = require('run-sequence');

var PROJECT_BASE_PATH = __dirname + '';

/*
 * gulp tasks
 * ***********************************************************************************************
 */

// default task, run with 'gulp', will list all available tasks

gulp.task('default', tasklist);

// build tasks

gulp.task('build', ['clean'], function (cb) {
    var pkg = require('./package.json');

    return gulp.src('./src/*.js')
        .pipe(concat(pkg.name + '-' + pkg.version + '.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename(pkg.name + '-' + pkg.version + '.min.js'))
        .pipe(uglify())
        .pipe(size({showFiles:true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function (cb) {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});

// versioning tasks

gulp.task('bump', function(cb) {
    runSequence('npm-bump', 'build', 'git-tag-commit', 'git-tag', cb);
});

gulp.task('npm-bump', function () {
  return gulp.src(['./package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('git-describe', function (cb) {
    console.log('Current release is now:');
    executeCommand('git describe --abbrev=0 --tags', cb);
});

gulp.task('git-tag', function(cb) {
    runSequence('git-tag-create', 'git-tag-push', 'git-describe');
});

gulp.task('git-tag-create', function(cb) {
    var pkg = require('./package.json');
    var v = 'v' + pkg.version;
    var message = 'Release ' + v;
    var commandLine = 'git tag -a ' + v + ' -m \'' + message + '\'';
    console.log(commandLine);
    executeCommand(commandLine, cb);
});

gulp.task('git-tag-push', function(cb) {
    var commandLine = 'git push origin master --tags';
    executeCommand(commandLine, cb);
});

gulp.task('git-tag-commit', function(cb) {
    var pkg = require('./package.json');
    var v = 'v' + pkg.version;
    var message = 'Release ' + v;
    var commandLine = 'git add -A && git commit -a -m\'' + message + '\'';
    console.log(commandLine);
    executeCommand(commandLine, cb);
});

// continous integration tasks

gulp.task('test', ['lint', 'karma-tests']);

gulp.task('lint', function (cb) {
  return gulp.src('./src/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('karma-tests', function(cb){
    console.log();
    console.log('Run all the tests now');
    var karmaConfigFile = PROJECT_BASE_PATH+'/test/karma.conf.js';
    var commandLine = 'karma start '+karmaConfigFile;
    executeCommand(commandLine, cb);
    console.log();
});

/*
 * helper functions
 * ***********************************************************************************************
 */

// execute the command line command in the shell
function executeCommand(commandLine, cb) {
    exec(commandLine, function(error, stdout, stderr) {
        puts(error, stdout, stderr);
        cb(null); // will allow gulp to exit the task successfully
    });
}

// well display console expressions
function puts(error, stdout, stderr) {
    sys.puts(stdout);
}
