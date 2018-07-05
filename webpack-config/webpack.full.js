const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.base.js');
const path = require('path');
const envParams = require('./environmentVariable');
const { argv } = require('yargs');

const theme = argv.env && argv.env.theme ? argv.env.theme : envParams.theme;

module.exports = merge(common, {
    entry: {
        ReactModal: path.resolve(__dirname, '../src/Modal.js')
    },
    devtool: 'source-map',
    output: {
        filename: '[name].full.js',
        path: path.resolve('./', 'dist/lib'),
        publicPath: '',
        library: 'ReactModal',
        libraryTarget: 'umd'
    },
    plugins: [
        new ExtractTextPlugin(`theme/${theme}/style.css`),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
});
