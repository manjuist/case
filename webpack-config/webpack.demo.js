const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const envParams = require('./environmentVariable');
const { argv } = require('yargs');

const theme = argv.env && argv.env.theme ? argv.env.theme : envParams.theme;

module.exports = merge(base, {
    entry: {
        app: path.resolve(__dirname, '../src/demo/app.js')
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve('./', `dist/demo/${theme}`)
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css')
    ]
});
