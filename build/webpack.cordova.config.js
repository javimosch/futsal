var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')
const htmlCompiler = require('../server/html-compiler');
module.exports = async() => {

    await htmlCompiler.writeIndexForCordova();

    return merge(baseWebpackConfig, {
        watch: process.env.WEBPACK_WATCH === 'true'
    });
};
