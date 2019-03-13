const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config.json');

const assetsPath = path.resolve(__dirname, '../static');

const { gitHash } = config.debugConfig;

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { main: ['./src/index.js'] },
  output: {
    path: assetsPath,
    filename: `js/[name]-${gitHash}.${isDev ? '' : '[contenthash:8]'}.js`,
    chunkFilename: `js/[name]-${gitHash}.${isDev ? '' : '[contenthash:8]'}.js`,
    publicPath: '/',
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: config.title,
      template: './template/index.html',
      filename: path.resolve(assetsPath, './index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: `styles/[name].${isDev ? '' : '[contenthash:8]'}.css`,
      chunkFilename:
          `styles/[name].${isDev ? '' : '[contenthash:8]'}.chunk.css`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      { test: /\.json$/, use: ['json-loader'] },
      {
        test: /\.less$/,
        use: [
          { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
      },
      { test: /\.(png|svg|jpg|gif)$/, use: ['url-loader'] },
      // 解析 MakeDown 文件
      { test: /\.md$/, use: ['html-loader', 'markdown-loader'] },
      // 解析数据资源
      { test: /\.(csv|tsv)$/, use: ['csv-loader'] },
      // 解析数据资源
      { test: /\.xml$/, use: ['xml-loader'] },
      // 解析 字体
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
    ],
  },
  resolve: {
    alias: { src: path.resolve(__dirname, 'src') },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
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
          enforce: false,
        },
        default: { minChunks: 2, priority: -20, reuseExistingChunk: true },
      },
    },
  },
};
