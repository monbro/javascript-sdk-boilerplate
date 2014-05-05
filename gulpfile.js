/**
 * this is the main task runner for managing the SampleSDK
 */

/*
 * define variables
 * ***********************************************************************************************
 */

var gulp = require('gulp');
var args   = require('yargs').argv;
var gutil = require('gulp-util');
var colours = require('colors');
var fs = require('fs');
var exec = require('child_process').exec;
var sys = require('sys');

var PROJECT_BASE_PATH = __dirname + '';

/*
 * main tasks
 * ***********************************************************************************************
 */

// default task, run with 'gulp'
gulp.task('default', function(){
    console.log();
    console.log('No default task defined.');
    console.log('The following tasks are available:');

    taskList = Object.keys(gulp.tasks);
    taskList.splice( taskList.indexOf( "default" ), 1 ); // remove not needed item
    for (var i = taskList.length - 1; i >= 0; i--) {
        console.log('- '+('gulp '+taskList[i]).green);
    }
    console.log();
});


gulp.task('testrun', function(cb){
    console.log();
    console.log('Run all the tests now');
    var karmaConfigFile = PROJECT_BASE_PATH+'/test/karma.conf.js';
    var commandLine = 'karma start '+karmaConfigFile;
    executeCommand(commandLine, cb);
    console.log();
});

/**
 * @todo  create gulp task to increment tag:
 * - read current last tag version
 * - git tag -a v0.0.1 -m 'version 0.0.1'
 * - git push origin v0.0.1
 */

/*
 * helper scripts
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
