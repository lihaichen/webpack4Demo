require('babel-polyfill');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackProdConfig = {
  devtool: 'hidden-source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({cache: true, parallel: true, sourceMap: true}),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};

module.exports = merge(webpackCommon, webpackProdConfig);
