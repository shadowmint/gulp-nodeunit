var run = require('run-sequence');
var babel = require('gulp-babel');
var gulp = require('gulp');

gulp.task('default', function(callback) {
  return gulp.src('./src/**/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./build'));
});
