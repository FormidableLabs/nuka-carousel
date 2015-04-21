'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    path: __dirname + '/dist/',
    filename: 'nuka-carousel.js',
    libraryTarget: 'umd'
  },

  debug: false,
  devtool: false,
  entry: './index.js',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel-loader'
    }]
  },
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],
};
