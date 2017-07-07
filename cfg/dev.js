'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let config = Object.assign({}, baseConfig, {
  entry: {
    'crmApp':'./src/crmApp.js'
  },
  eslint: {
    fix: true
  },
  cache: true,
  devtool: '#source-map',
  plugins: [
   
    new ExtractTextPlugin("styles.css"),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      modulesDirectories: ["bower_components"],
      manifestFiles:[".bower.json"],
      searchResolveModulesDirectories: false
    })
    
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js)$/,
  loader: 'babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
