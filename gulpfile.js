var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var babel = require("gulp-babel");
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

gulp.task('reload', function(){
  return gulp.src('dist')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass')
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'))
})

gulp.task('babel', function() {
  return gulp.src('app/js/*.es6')
    .pipe(babel())
    .pipe(gulp.dest('app/js'))
})

gulp.task('clean:dist', function() {
  return del.sync('dist/*');
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('app/js/*.js', uglify()))
    .pipe(gulpIf('app/css/*.css', cssnano()))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('images', function(){
  return gulp.src('app/img/**')
    .pipe(gulp.dest('dist/img/'))
});

gulp.task('update', function (callback) {
  runSequence('clean:dist', 'useref', 'images', 'reload',
    callback
  )
})

gulp.task('watch', ['browserSync'], function(){
  gulp.watch('app/sass/*.sass', ['sass']);
  gulp.watch('app/js/*.es6', ['babel']);
  gulp.watch('app/*.html', ['update']);
  gulp.watch('app/css/**/*.css', ['update']);
  gulp.watch('app/js/**/*.js', ['update']);
  // Other watchers
})

gulp.task('default', function (callback) {
  runSequence('sass', 'babel', 'update', ['watch'],
    callback
  )
})

gulp.task('build', function (callback) {
  runSequence('sass', 'babel', ['update'],
    callback
  )
})
