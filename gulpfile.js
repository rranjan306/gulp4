const gulp = require('gulp');
const scss = require('gulp-scss');
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del  = require('del');
const webserver = require('gulp-webserver');

gulp.task('scss', async function() {
  return gulp.src('app/style/**/*.scss')
         .pipe(scss())
         .pipe(minifyCSS())
         .pipe(gulp.dest('dest/public/css'));
});

gulp.task('vendorCSS', async function() {
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
         .pipe(concat('vendor.css'))
         .pipe(gulp.dest('dest/public/css/vendor'));
  });


gulp.task('vendorJS', async function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js'])
         .pipe(concat('vendor.js'))
         .pipe(gulp.dest('dest/public/js/vendor'));
  });

gulp.task('copyHTML', async function() {
  return gulp.src('app/index.html')
         .pipe(gulp.dest('dest'));
});

gulp.task('webserver', function() {
  gulp.src('dest')
    .pipe(webserver({
      fallback: 'index.html'
    }));
});

gulp.task('del', function(done) {
  del.sync(['dest']);
  done()
});


gulp.task('build', gulp.series(['copyHTML', 'vendorCSS', 'vendorJS', 'scss']));
gulp.task('default', gulp.series(['del', 'build']));