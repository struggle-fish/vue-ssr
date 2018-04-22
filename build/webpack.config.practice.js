const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// const ExtractPlugin = require('extract-text-webpack-plugin') // css 分离插件
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge') // 合并webpack配置

const devServer = {
  port: 9009,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}
const defaultPlugin = [
  // 设置入口模板
  new HTMLPlugin({
    template: path.join(__dirname, '../practice/template.html')
  })
]
let config
config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  devServer,
  resolve: {
    alias: { // 指定 vue 版本
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: defaultPlugin.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
