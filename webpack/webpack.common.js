const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config.json');
const assetsPath = path.resolve(__dirname, '../static');

module.exports = {
  plugins:[
    new HtmlWebpackPlugin({
      title: config.title,
      template: './template/index.html',
      filename: path.resolve(assetsPath, './index.html')
    })
  ],
  module: {
    rules: [
      {test: /\.js[x]?$/, exclude: /node_modules/, use: ['babel-loader']},
      {test: /\.json$/, use: ['json-loader']}, {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
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
};