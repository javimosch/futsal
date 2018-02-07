var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')
var webpackConfig = merge(baseWebpackConfig, {
  watch: true,
  watchOptions: {
    ignored: [/node_modules/, '/server/*']
  },
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/entry-client.js'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
module.exports = webpackConfig
