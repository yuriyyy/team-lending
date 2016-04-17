var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var jade = require('gulp-jade');
var nib = require('nib');
var rupture = require('rupture');



gulp.task('styles', function() {
  return gulp.src('app/stylus/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [nib(), rupture()]
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public'));
});

gulp.task('templates', function() {
  return gulp.src('app/tamplates/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function(){
  gulp.watch('app/stylus/main.styl', ['default']);
  gulp.watch('app/tamplates/index.jade', ['templates']);
});

gulp.task('build', ['styles', 'templates']);

gulp.task('default', ['build']);
