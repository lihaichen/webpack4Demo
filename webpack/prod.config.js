require('babel-polyfill');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpackCommon = require('./webpack.common.js');

const webpackProdConfig = {
  devtool: 'hidden-source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true, parallel: true, sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
      new BundleAnalyzerPlugin(),
    ],
  },
};

module.exports = merge(webpackCommon, webpackProdConfig);
