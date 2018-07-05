const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pkg = require('../package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const envParams = require('./environmentVariable');
const { argv } = require('yargs');

const theme = argv.env && argv.env.theme ? argv.env.theme : envParams.theme;

const extractFontCss = new ExtractTextPlugin('fonts/iconfont.css');
const extractCss = new ExtractTextPlugin(`theme/${theme}/style.css`);

module.exports = {
    entry: {
        ReactModal: path.resolve(__dirname, '../src/Modal.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./', 'dist/lib'),
        publicPath: '',
        library: 'ReactModal',
        libraryTarget: 'umd'
    },
    resolve: {
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
        alias: {
            iconFont: path.resolve(__dirname, '../node_modules/scopa-icons-fe-ml/fonts/iconfont.css'),
        }
    },
    externals: Object.keys(pkg.dependencies),
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
            oneOf: [
                {
                    exclude: path.resolve(__dirname, '../node_modules/scopa-icons-fe-ml/fonts/iconfont.css'),
                    use: extractCss.extract({
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
                    include: path.resolve(__dirname, '../node_modules/scopa-icons-fe-ml/fonts/iconfont.css'),
                    use: extractFontCss.extract([{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }])
                }
            ]
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
        }]
    },
    devtool: 'source-map',
    plugins: [
        extractFontCss,
        extractCss,
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};
