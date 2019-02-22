const webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  commonConfig = require('./webpack.common.js'),
  path = require('path'),
  rootDir = path.resolve(__dirname, '..');

  console.log('Running file webpack.development.js');
  console.log('root dir: ' + rootDir);

const env = process.env.NODE_ENV;

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  output: {
    path: path.resolve(rootDir, 'wwwroot/devDist'),
    sourceMapFilename: '[name].map',
    publicPath: '/devDist/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [
      // {
      //   "test": /\.ts$/,
      //   "loader": "@ngtools/webpack"
      // }
      {
        test: /\.ts$/,
        exclude: [/node_modules\/(?!(ng2-.+|ngx-.+|ngu-.+))/],
        loaders: ['awesome-typescript-loader', 'angular-router-loader', 'angular2-template-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    contentBase:'./wwwroot/'
  }
});