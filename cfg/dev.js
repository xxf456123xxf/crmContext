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
    //'commons':['jquery','jquery.cookie','underscore','CrmFetchKit'],
    'crmApp':'./src/crmApp.js'
  },
  // entry: ['webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
  //   'webpack/hot/only-dev-server',
  //   './src/index'],
  eslint: {
    fix: true
  },
  cache: true,
  devtool: '#source-map',
  plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      // name: "commons",
    //   // (the commons chunk name)

    //   filename: "commons.js",
    //   // (the filename of the commons chunk)
    //   //children: true,
    //   minChunks: Infinity,
    //   // (Modules must be shared between 3 entries)

    //   // chunks: ["pageA", "pageB"],
    //   // (Only use these entries)
    // }),
    //new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin("styles.css"),
    //new webpack.HotModuleReplacementPlugin(),
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
