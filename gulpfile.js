var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

process.setMaxListeners(0);

gulp.task('test', function() {
  var options = {
    reporter: 'spec',
    require: [],
    bail: true,
    recursive: true,
    growl: true
  };

  return gulp.src(['./commands/tests/**/*.spec.js'])
    .pipe(mocha(options));
});


gulp.task('lint', function() {
  return gulp
    .src([
      'gulpfile.js',
      './commands/**/*.js',
      '!./node_modules/**/*.js',
      '!./coverage/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('watch', function() {
  return gulp.watch(['./commands/**/*.js'], ['lint', 'test']);
});


gulp.task('default', ['lint', 'test', 'watch']);
