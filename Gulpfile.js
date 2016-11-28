'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var open = require('gulp-open');
var babel = require('gulp-babel');
var del = require('del');
var webpack = require('webpack');
var gwebpack = require('gulp-webpack');
var WebpackDevServer = require("webpack-dev-server");

var karma = require('karma').server;

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.demo.config.js');

gulp.task('open', function(){
  open('',{url: 'http://localhost:8080/webpack-dev-server/'});
});

gulp.task("babel", function() {
  return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task("webpack-dev-server", function(callback) {

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: "/assets/",
    contentBase: "demo",
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
  });

});

gulp.task("karma", function() {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  });
});

gulp.task('test', ['karma']);
gulp.task('build', ['babel']);
gulp.task('default', ['webpack-dev-server', 'open']);
