module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 8781,
          hostname: '0.0.0.0',
          useAvailablePort: true,
          livereload: 35351,
          open: true,
          debug: true,
          middleware: function (connect, options) {
            return [
              require('connect-livereload')({ port: 35351 }),
              connect().use('/bower_components', 
              connect.static('./bower_components')),
              connect.static('src')
            ];
          }
        }
      }
    },

    watch: {
      reload: {
        files: [
          'src/js/**/*.js',
          'src/css/**/*.css',
          'index.html'],
        tasks: [],
        options: {
          livereload: 35351
        }
      },
      scss: {
        files: ['src/scss/**/*.scss','*.scss'],
        tasks: ['compass','autoprefixer'],
        options: {
          livereload: 35351
        }
      },
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      }
    },

    compass: {
      build: {
        options: {
          relativeAssets: true,
          sassDir: 'src/scss',
          cssDir: 'src/css',
          imagesDir: 'src/img',
          environment: 'development',
          outputStyle: 'expanded'
        }
      }
    },

    autoprefixer: {
      build: {
        options: {
          browsers: ['last 2 versions', 'ie 9']
        },
        src: 'src/css/main.css',
        dest: 'src/css/main.css'
      }
    },

    bowerInstall: {
      app: {
        src: ['src/index.html']
      },
      sass: {
        src: ['src/scss/{,*/}*.{scss,sass}']
      }
    }

  });

  // Default task.
  grunt.registerTask('default', 'server');
  grunt.registerTask('server', ['connect','watch']);

};