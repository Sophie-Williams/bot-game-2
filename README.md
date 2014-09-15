Bot Game
====================

Simple programming game for children.

Features
-------

- [Grunt](http://gruntjs.com/) or [Gulp](http://gulpjs.com/) task runner and build system.
- Simple Local HTTP Server with live browser reload.
- CSS preprocessor with [Sass](http://sass-lang.com/) and [LibSass](http://libsass.org/).

Features (TBD)
-------

- Testing with [Karma](http://karma-runner.github.io/0.12/index.html) and [Jasmine](http://jasmine.github.io/2.0/introduction.html) or [Mocha](http://visionmedia.github.io/mocha/).
- Modules with [Bower](http://bower.io/) Package Manager and [RequireJS](http://requirejs.org/) AMD module loader or [Browserify](http://browserify.org/) or ES6 Modules via [ES6 Module Transpiler](http://esnext.github.io/es6-module-transpiler/).
- Scaffolding with [Yeoman](http://yeoman.io/) or [Slush](http://slushjs.github.io/#/).

Build Task
-------

| Task | Grunt Task | Gulp Task |
| --------- | ----------- | ----------- |
| local server | [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) | [gulp-connect](https://github.com/avevlad/gulp-connect) + [gulp-open](https://github.com/stevelacy/gulp-open) |
| file watcher | [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) | [gulp.watch](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb) |
| css preprocessor | [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) | [gulp-sass](https://www.npmjs.org/package/gulp-sass) |
| autoprefixer | [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) | [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) |
| javascript hint | [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) | [gulp-jshint](https://github.com/spenceralger/gulp-jshint) |
| javascript uglify | [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) | [gulp-uglify](https://github.com/terinjokes/gulp-uglify) |
| unit test | [grunt-karma](https://github.com/karma-runner/grunt-karma) | [gulp-karma](https://github.com/lazd/gulp-karma) |
| test runner | [karma-jasmine](https://github.com/karma-runner/karma-jasmine) | [karma-mocha](https://github.com/karma-runner/karma-mocha) |

Requirements
-------

- Node.js
- Ruby, Sass `3.2`
- Grunt `^0.4.0`

Usage with Grunt
-------
	npm install -g grunt
	npm install -g bower
    npm install
    bower install
    grunt
    
Usage with Gulp
-------

    npm install
    npm install -g gulp
    bower install
    gulp

License
-------

[MIT License](http://www.opensource.org/licenses/mit-license.php)

&copy; 2014 Béla Varga &lt;bela@ecmanauten.de&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.