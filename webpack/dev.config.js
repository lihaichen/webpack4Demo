require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
const assetsPath = path.resolve(__dirname, '../static');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');
const smp = new SpeedMeasurePlugin();

const config = require('../config.json');
const proxy = config.proxyConfig;
const gitHash = config.debugConfig.gitHash;

const webpackProxy = {};
console.log('===>代理配置：');
proxy.forEach(function(item) {
  console.log(`代理【${item.path}】到【${item.target}】服务`);
  webpackProxy[item.path] = {target: item.target, pathRewrite: {'^/api': ''}};
});

const webpackDevConfig = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    // enable HMR on the server
    contentBase: assetsPath,
    // match the output path
    publicPath: '/',
    // match the output `publicPath`,
    historyApiFallback: true,
    proxy: webpackProxy,
    host: '0.0.0.0',
    port: 8989,
    disableHostCheck: true,
    overlay: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = smp.wrap(merge(webpackCommon, webpackDevConfig));
