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
var git = require('gulp-git');
var clean = require('gulp-clean');
var bump = require('gulp-bump');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var pkg = require('./package.json');
var colours = require('colors');
var fs = require('fs');
var exec = require('child_process').exec;
var sys = require('sys');
var tasklist = require('gulp-task-listing');
var runSequence = require('gulp-run-sequence');

var PROJECT_BASE_PATH = __dirname + '';

/*
 * gulp tasks
 * ***********************************************************************************************
 */

// default task, run with 'gulp', will list all available tasks

gulp.task('default', tasklist);

// build tasks

gulp.task('build', function () {
  return gulp.src('./src/*.js')
    .pipe(concat(pkg.name + '-' + pkg.version + '.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(rename(pkg.name + '-' + pkg.version + '.min.js'))
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});

// versioning tasks

gulp.task('bump', function(cb) {
    runSequence('npm-bump', 'git-tag', 'git-describe', cb);
});

gulp.task('npm-bump', function () {
  return gulp.src(['./package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('git-tag', function () {
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.tag(v, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});

gulp.task('git-describe', function (cb) {
    console.log('Current release is now:');
    executeCommand('git describe --abbrev=0 --tags', cb);
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
