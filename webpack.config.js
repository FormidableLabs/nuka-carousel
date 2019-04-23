const path = require('path');

module.exports = {
  output: {
    path: __dirname,
    sourceMapFilename: '[name].map',
    filename: 'main.js',
    publicPath: '/assets/'
  },

  entry: ['./src/new-hooks/index.js'],

  resolve: {
    extensions: ['.js', '.css'],
    modules: [path.join(__dirname, 'node_modules')]
  },

  devServer: {
    contentBase: './src/new-hooks/',
    historyApiFallback: true,
    hot: false
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader!css-loader' }]
      },
      {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=8192'
      }
    ]
  }
};
