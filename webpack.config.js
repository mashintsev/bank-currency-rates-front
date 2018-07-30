'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: './js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style!css!postcss!less!', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!'),
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'react-hot!babel',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  postcss: function() {
    return [
      autoprefixer({browsers: ['last 5 versions']})
    ];
  },
  resolve: {
    root: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'js', 'fw', 'lib')
    ]
  },
  devServer: {
    port: 8008,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api' : ''},
        secure: false
      }
    }
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
    new HtmlWebpackPlugin({
      title: 'Курсы валют банков РФ',
      description: '',
      username: 'Ivan Mashintsev',
      filename: 'index.html',
      inject: 'body',
      template: 'index.html_vm',
      favicon: 'img/favicon.png',
      hash: false
    })
  ]
};
