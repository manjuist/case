const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(base, {
    entry: {
        app: path.resolve(__dirname, '../src/demo/app.js')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});
