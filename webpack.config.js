const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
// const { injectBabelPlugin } = require('react-app-rewired')

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.join(ROOT_PATH, 'src')

const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: path.join(APP_PATH, 'app.js')
    },
    output: {
        path: path.resolve(ROOT_PATH, 'dist'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendor'
                },
                default: {
                    chunks: 'initial',
                    minChunks: 2,
                    name: 'default'
                }
            }
        }
    },
    devServer: {
        hot: true,
        inline: true, // inline模式
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        proxy: {
            '/info/*': {
                target: 'http://localhost:3333',
                port: 3333,
            }
        }
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.jsx', '.scss', '.less', '.css'],
        alias: {
            '@': ROOT_PATH,
            app: APP_PATH,
            views: path.resolve(APP_PATH, 'views'),
            config: path.resolve(APP_PATH, 'config'),
            common: path.resolve(APP_PATH, 'common'),
            components: path.resolve(APP_PATH, 'components')
            // scripts: path.join(APP_PATH, 'scripts'),
            // styles: path.join(APP_PATH, 'styles'),
        }
    },
    module: {
        // noParse: /react|antd|lodash/,
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_nodules/,
                loader: 'eslint-loader',
                enforce: 'pre'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_nodules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|git|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    // 插件项
    plugins: [
        new DllReferencePlugin({
            manifest: require('./dist/react.manifest.json')
        }),
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'index',
            template: 'index.html',
            dllFile: 'react.dll.js'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify('production'),
        }),
        new FriendlyErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}

module.exports = config
