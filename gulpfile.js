var gulp        = require('gulp'),
    clean       = require('gulp-clean'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch'),
    kss         = require('gulp-kss'),
    browserSync = require('browser-sync'),
    prefix      = require('gulp-autoprefixer'),
    source      = require('vinyl-source-stream'),
    watchify    = require('watchify');

var DIR = {
  STYLES: './assets/styles',
  SCRIPTS: './assets/scripts'
};

//
// TASKS
// -------------------------------------------------------------

gulp.task('css', function() {
  return watch({glob: DIR.STYLES + '/**/*.scss'})
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(prefix("last 1 version", "> 1%", "ie 10"))
    .pipe(gulp.dest(DIR.STYLES))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', ['watchify'], function() {  
  browserSync.init(null, {
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watchify', function() {
  var bundler = watchify(DIR.SCRIPTS + '/index.js');

  bundler.transform('reactify');

  bundler.on('update', rebundle);

  function rebundle () {
    return bundler.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(DIR.SCRIPTS))
      .pipe(browserSync.reload({stream:true, once: true}));
  }

  return rebundle();
});

gulp.task('default', ['css', 'browser-sync'], function(){
  gulp.watch(DIR.STYLES + '/**/*.scss', ['css']);
  gulp.watch(DIR.SCRIPTS + '**/*.js', ['watchify']);
});
