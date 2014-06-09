var gulp        = require('gulp'),
    clean       = require('gulp-clean'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch'),
    kss         = require('gulp-kss'),
    browserSync = require('browser-sync'),
    prefix      = require('gulp-autoprefixer');

var DIR = {
  STYLES: 'assets/styles',
  SCRIPTS: 'assets/scripts'
};

//
// TASKS
// -------------------------------------------------------------

gulp.task('css', function() {
  watch({glob: DIR.STYLES + '/**/*.scss'}, function(files) {
    return files.pipe(sass({
        errLogToConsole: true
      }))
      .pipe(prefix("last 1 version", "> 1%", "ie 10"))
      .pipe(gulp.dest(DIR.STYLES))
      .pipe(browserSync.reload({stream: true}));
  });
});

// gulp.task('clean', function(){
//   return gulp.src([
//       settings.styleguide
//     ], {read: false})
//     .pipe(clean({force: true}));
// });

// gulp.task('kss', function() {
//   gulp.src([settings.source + 'stylesheets/**/*.scss'])
//     .pipe(kss({
//       overview: 'README.md',
//       templateDirectory: settings.styleguideTemplate
//     }))
//     .pipe(gulp.dest(settings.styleguide))
//     .pipe(gulp.dest('source/styleguide/'));
// });
//
gulp.task('browser-sync', ['build'], function() {  
  browserSync.init(null, {
    server: {
      baseDir: './'
    }
  });
});

// --- Bringing it all together in a build task ---
gulp.task('build', ['css']);

// --- Let gulp keep an eye on our files and compile stuff if it changes ---
gulp.task('watch', ['browser-sync'], function () {
  gulp.watch(DIR.STYLES + '/**/*.scss', ['css']);
});

// --- Default gulp task, run with gulp. - Starts our project and opens a new browser window.
gulp.task('default',  function(){
  gulp.start('watch');
});
