'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = {
  host : '0.0.0.0',
  port : 8000
}

gulp.task('server', function(){
  $.connect.server({
    root: 'src',
    host: config.host,
    port: config.port,
    livereload: true,
    middleware: function(connect) {
      return [
        connect().use('/bower_components',
        connect.static('./bower_components'))
      ];
    }
  });
});

gulp.task('open', function(){
  var options = {
    url: 'http://' + config.host + ':' + config.port
  };
  gulp.src('./src/index.html')
  .pipe($.open("", options));
});


// gulp.task('sass', function () {
//     return gulp.src(['src/scss/**/*.scss'])
//         .pipe($.rubySass({
//             style: 'expanded',
//             precision: 10,
//             loadPath: ['src/scss']
//         }))
//         .pipe($.autoprefixer('last 1 version'))
//         .pipe(gulp.dest('src/css'))
//         .pipe($.size({title: 'css'}));
// });


gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe($.connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.html'], ['html']);
});

gulp.task('default', ['server', 'open', 'watch']);


  // grunt.registerTask('default', 'server');
  // grunt.registerTask('server', ['connect','watch']);