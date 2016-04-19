var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var jade = require('gulp-jade');
var nib = require('nib');
var rupture = require('rupture');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './public/'
        },
        notify: false
    });
});

gulp.task('styles', function() {
  return gulp.src('app/stylus/**/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [nib(), rupture()]
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('templates', function() {
  return gulp.src('app/tamplates/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', ['browser-sync', 'templates', 'styles'], function(){
  gulp.watch('app/stylus/**/*.styl', ['default']);
  gulp.watch('app/tamplates/**/*.', ['templates']);
  gulp.watch('./public/**/*.html', browserSync.reload);
});

gulp.task('build', ['styles', 'templates']);

gulp.task('default', ['build']);
