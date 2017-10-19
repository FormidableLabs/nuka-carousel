'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    path: __dirname,
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true,
  devtool: false,
  entry: [
    './demo/app.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    enforceExtension: false,
    extensions: ['.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      enforce: 'pre',
      exclude: [/node_modules/,/dist/],
      loader: 'eslint-loader'
    }, {
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

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]

};
