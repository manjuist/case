// const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const envParams = require('./environmentVariable');
const autoprefixer = require('autoprefixer');
const { argv } = require('yargs');

const theme = argv.env && argv.env.theme ? argv.env.theme : envParams.theme;

module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
        alias: {
            demoStyle: path.resolve(__dirname, `../node_modules/component-demo-style-fe-ml/dist/${theme}/demo.css`),
            iconFont: path.resolve(__dirname, '../node_modules/scopa-icons-fe-ml/fonts/iconfont.css'),
        }
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            targets: {
                                chrome: 46,
                                browsers: ['last 2 versions'],
                                include: ['transform-es2015-arrow-functions'],
                            }
                        }],
                        'react'
                    ],
                    plugins: [
                        'transform-class-properties',
                        'transform-object-rest-spread',
                        'dynamic-import-webpack',
                        'syntax-dynamic-import'
                    ]
                }
            },
            exclude: /node_modules/
        },
        {
            test: /(\.css|\.scss)$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [autoprefixer({
                            browsers: ['iOS >= 7', 'Android >= 4.1',
                                'Chrome >= 46', 'last 10 Firefox versions',
                                'Safari >= 6', 'ie > 8'
                            ]
                        })]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            path.resolve(__dirname, `../node_modules/sass-theme-fe-ml/${theme}`),
                            path.resolve(__dirname, `../node_modules/component-demo-style-fe-ml/dist/${theme}`)
                        ],
                        minimize: true
                    }
                }]
            })
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'css/images/[name].[ext]',
                    publicPath: '../'
                }
            }]
        },
        {
            test: /\.(eot|ttf|woff|woff2|svg|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '../'
                    // includePaths: [path.resolve(__dirname,'../src/common/fonts')]
                }
            }]
        },
        {
            test: /\.md$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            targets: {
                                chrome: 46,
                                browsers: ['last 2 versions'],
                                include: ['transform-es2015-arrow-functions'],
                            }
                        }],
                        'react'
                    ],
                    plugins: [
                        'transform-class-properties',
                        'transform-object-rest-spread',
                    ]
                }
            }, 'markdown-it-react-loader-fe-ml']
        }]
    },
    plugins: [
        //new ExtractTextPlugin(`theme/${theme}/style.css`)
    ]
};
