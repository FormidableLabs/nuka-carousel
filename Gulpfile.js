'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpIf = require('gulp-if');
var open = require('gulp-open');
var babel = require('gulp-babel');
var del = require('del');
var webpack = require('webpack');
var gwebpack = require('gulp-webpack');
var WebpackDevServer = require('webpack-dev-server');

var eslint = require('gulp-eslint');
var Server = require('karma').Server;

var webpackDevConfig = require('./webpack.config.js');

function isFixed(file) {
  // has ESLint fixed the file contents?
  return file.eslint !== null && file.eslint.fixed;
}

function openDevServer(callback) {
  open('', {url: 'http://localhost:8080/webpack-dev-server/'});
  callback();
}

gulp.task('babel', function() {
  return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

function webpackDevServer(callback) {
  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/assets/',
    contentBase: 'demo',
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    callback();
  });
}

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('lint:fix', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
		// if fixed, write the file to dest
		.pipe(gulpIf(isFixed, gulp.dest('src')));

});

gulp.task('karma', gulp.series('lint', function() {
  var server = new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  })
  server.start()
}));

gulp.task('test', gulp.series('lint', 'karma'));
gulp.task('build', gulp.series('lint:fix', 'babel'));
gulp.task('default', gulp.series(webpackDevServer, openDevServer));
