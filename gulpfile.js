'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


gulp.task('sass', function () {
    return gulp.src(['src/scss/**/*.scss'])
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['src/scss']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('src/css'))
        .pipe($.size({title: 'css'}));
});


gulp.task('default', ['sass']);


  // grunt.registerTask('default', 'server');
  // grunt.registerTask('server', ['connect','watch']);