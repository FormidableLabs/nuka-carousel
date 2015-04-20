'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    publicPath: '/',
    path: __dirname + '/dist/',
    filename: 'nuka-carousel.js'
  },

  debug: false,
  devtool: false,
  entry: './index.js',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  },
  externals: {
    'react/addons': 'React',
    'react': 'React'
  }
};
