require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
const assetsPath = path.resolve(__dirname, '../static');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config.json');
const proxy = config.proxyConfig;
const gitHash = config.debugConfig.gitHash;

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const webpackProxy = {};
console.log('===>代理配置：');
proxy.forEach(function(item) {
  console.log(`代理【${item.path}】到【${item.target}】服务`);
  webpackProxy[item.path] = {target: item.target, pathRewrite: {'^/api': ''}};
});

module.exports = smp.wrap({
  devtool: 'cheap-module-eval-source-map',
  entry: {main: ['./src/index.js'], vendor: ['babel-polyfill']},
  output: {
    path: assetsPath,
    filename: `js/[name]-${gitHash}.js`,
    publicPath: '/',
    chunkFilename: `[name]-${gitHash}.js`
  },
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
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), new HtmlWebpackPlugin({
      title: config.title,
      template: './template/index.html',
      filename: path.resolve(assetsPath, './index.html')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {test: /[\\/]node_modules[\\/]/, priority: -10},
        default: {minChunks: 2, priority: -20, reuseExistingChunk: true}
      }
    }
  },
  module: {
    rules: [
      {test: /\.js[x]?$/, exclude: /node_modules/, use: ['babel-loader']},
      {test: /\.json$/, use: ['json-loader']}, {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'  // creates style nodes from JS strings
          },
          {
            loader: 'css-loader'  // translates CSS into CommonJS
          },
          {
            loader: 'less-loader'  // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'  // creates style nodes from JS strings
          },
          {
            loader: 'css-loader'  // translates CSS into CommonJS
          }
        ]
      },
      {test: /\.(png|svg|jpg|gif)$/, use: ['url-loader']},
      // 解析 MakeDown 文件
      {test: /\.md$/, use: ['html-loader', 'markdown-loader']},
      // 解析数据资源
      {test: /\.(csv|tsv)$/, use: ['csv-loader']},
      // 解析数据资源
      {test: /\.xml$/, use: ['xml-loader']},
      // 解析 字体
      {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']}
    ]
  },
  resolve: {
    alias: {src: path.resolve(__dirname, 'src')},
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
});
