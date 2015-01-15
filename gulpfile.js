var gulp        = require('gulp'),
    runSequence = require('run-sequence'),
    merge       = require('merge-stream'),
    $           = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    del         = require('del');

/* Removes previously built release */
gulp.task('clean', function(cb){
  del(['build/**'], cb);
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

/* Minifying CSS */
gulp.task('css', function(){
  var css1 = gulp.src('./css/*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({stream: true}));

  var css2 = gulp.src('./views/css/*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('./build/views/css'))
    .pipe(browserSync.reload({stream: true}));

  return merge(css1, css2);
});

/* Inline CSS and Minify HTML */
gulp.task('inline-and-minify', function(){
  var html1 = gulp.src('./*.html')
    .pipe($.smoosher({
      base: './build'
    }))
    .pipe($.minifyHtml())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream: true}));

  var html2 = gulp.src('./views/*.html')
    .pipe($.smoosher({
      base: './build/views'
    }))
    .pipe($.minifyHtml())
    .pipe(gulp.dest('./build/views'))
    .pipe(browserSync.reload({stream: true}));

  return merge(html1, html2);
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

/* Task Bundles, runs tasks one after the other (instead of in parallel) */
gulp.task('build-html', function(callback){
  runSequence(
    'css',
    'inline-and-minify',
    callback);
});

/* Watch Tasks */
gulp.task('watch', function(){
  gulp.watch(['./css/*.css', './views/css/*.css'], ['build-html']);
  gulp.watch(['./js/*.js', './views/js/*.js'], ['js']);
  gulp.watch(['./*.html', './views/*.html'], ['build-html']);
});

/* Starting BrowserSync Server */
gulp.task('browser-sync', function(){
  browserSync({
    proxy: '127.0.0.1:8000'
  });
});

gulp.task('default', function(callback){
  runSequence(
    'clean',
    'js',
    'imgs',
    'build-html',
    'browser-sync',
    'watch',
    callback);
});