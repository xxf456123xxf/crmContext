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
  //'commons':["react","react-dom","redux","react-redux","superagent","lodash","reduce-component","babel-polyfill"],
  'app': path.join(__dirname, '../src/index'),
  'crmapp': path.join(__dirname, '../src/crmApp'),
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "commons",
    //   // (the commons chunk name)

    //   filename: "commons.js",
    //   // (the filename of the commons chunk)
    //   //children: true,
    //   minChunks: Infinity,
    //   // (Modules must be shared between 3 entries)

    //   // chunks: ["pageA", "pageB"],
    //   // (Only use these entries)
    // }),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    ),
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
