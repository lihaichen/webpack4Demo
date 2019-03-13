const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('../config.json');
const assetsPath = path.resolve(__dirname, '../static');
const gitHash = config.debugConfig.gitHash;

let isDev = (process.env.npm_lifecycle_script.indexOf('development') === -1) ? false : true;

module.exports = {
  entry: {main: ['./src/index.js']},
  output: {
    path: assetsPath,
    filename: `js/[name]-${gitHash}.${isDev ? '' : '[chunkhash:8]'}.js`,
    chunkFilename: `js/[name]-${gitHash}.${isDev ? '' : '[chunkhash:8]'}.js`,
    publicPath: '/'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: config.title,
      template: './template/index.html',
      filename: path.resolve(assetsPath, './index.html')
    }),

  ],
  module: {
    rules: [
      {test: /\.js[x]?$/, exclude: /node_modules/, use: ['babel-loader']},
      {test: /\.json$/, use: ['json-loader']}, {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'}, {loader: 'css-loader'},
          {loader: 'less-loader'}
        ]
      },
      {test: /\.css$/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}]},
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
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        react: {
          test: /[\\/]?node_modules[\\/]react*[\\/]?/,
          chunks: 'initial',
          name: 'react',
          priority: 20,
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: false
        },
        default: {minChunks: 2, priority: -20, reuseExistingChunk: true}
      }
    }
  }
};
