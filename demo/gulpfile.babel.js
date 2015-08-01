var nodeunit = require('../');
var run = require('run-sequence');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var gulp = require('gulp');

gulp.task('default', ['scripts-1', 'scripts-2']);

gulp.task('scripts-1', function() {
  return gulp.src('./src/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./build/scripts'));
});

gulp.task('scripts-2', function() {
  return gulp.src('./components/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./build/components'));
});

gulp.task('test', function(callback) {
  run('default', 'nodeunit', callback);
});

gulp.task('nodeunit', function() {
  return gulp.src('./build/**/*.tests.js')
    .pipe(nodeunit());
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['test']);
  gulp.watch('./components/**/*.js', ['test']);
});