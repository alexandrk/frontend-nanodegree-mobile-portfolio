var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();
    browserSync = require('browser-sync');

/* Minifying CSS */
gulp.task('css', function(){
  gulp.src('./css/*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({stream: true}));

  gulp.src('./views/css/*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('./build/views/css'))
    .pipe(browserSync.reload({stream: true}));
});

/* Minifying Javascript */
gulp.task('js', function(){
  gulp.src('./js/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.reload({stream: true}));

  gulp.src('./views/js/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./build/views/js'))
    .pipe(browserSync.reload({stream: true}));
});

/* Compressing Images */
gulp.task('imgs', function(){
  gulp.src('./img/*')
    .pipe($.imagemin())
    .pipe(gulp.dest('./build/img'));

  gulp.src('./views/images/*')
    .pipe($.imagemin())
    .pipe(gulp.dest('./build/views/images'));
});

/* Minify HTML */
gulp.task('html', function(){
  gulp.src('./*.html')
    .pipe($.minifyHtml())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream: true}));

  gulp.src('./views/*.html')
    .pipe($.minifyHtml())
    .pipe(gulp.dest('./build/views'))
    .pipe(browserSync.reload({stream: true}));
});

// Watch Tasks
gulp.task('watch', function(){
  gulp.watch(['./css/*.css', './views/css/*.css'], ['css']);
  gulp.watch(['./js/*.js', './views/js/*.js'], ['js']);
  gulp.watch(['./*.html', './views/*.html'], ['html']);
});

/* Starting BrowserSync Server */
gulp.task('browser-sync', function(){
  browserSync({
    proxy: '127.0.0.1:8000'
  });
});

gulp.task('default', ['html', 'css', 'js', 'imgs', 'browser-sync', 'watch']);