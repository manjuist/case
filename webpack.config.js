const path              = require("path")
const webpack           = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
//const { injectBabelPlugin } = require('react-app-rewired')

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.join(ROOT_PATH, 'src')

const config = {
    mode: "development",
    entry:{
        index:path.join(APP_PATH,'scripts/index.js')
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:'/',
        filename:'[name].bundle.js'
    },
    devtool:'source-map',
    module:{
        rules:[
            {
                enforce: "pre",
                test:/\.(js|jsx)$/,
                exclude: /node_nodules/,
                use: "eslint-loader"
            },
            {
                test:/\.(js|jsx)$/,
                exclude: /node_nodules/,
                use: {
                        loader:'babel-loader',
                        options:{
                            presets:[
                                'env',
                                'react',
                                'stage-0'
                            ],
                            compact:false
                        }
                    }
            },
            {
                test:/\.(css|scss)$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options:{
                            sourceMap:true
                        }
                    },{
                        loader: 'sass-loader',
                        options:{
                            sourceMap:true
                        }
                    },{
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test:/\.(png|jpg|git|svg)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            limit:8192
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            limit:8192
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
                  chunks: 'async',
                  minSize: 30000,
                  minChunks: 1,
                  maxAsyncRequests: 5,
                  maxInitialRequests: 3,
                  automaticNameDelimiter: '~',
                  name: true,
            cacheGroups: {
                vendors: {
                              test: /[\\/]node_modules[\\/]/,
                              priority: -10
                },
                default: {
                              minChunks: 2,
                              priority: -20,
                              reuseExistingChunk: true
                }
            }
        }
    },
    devServer:{
        hot:true,
        inline:true,//inline模式
        contentBase:path.join(__dirname,'dist'),
        compress:true,
        port:3000,
        proxy: {
            '/info/*':{
                target: 'http://localhost:3333',
                port: 3333,
            }
        }
    },
    resolve:{
        alias:{
            '@': ROOT_PATH,
            'app': APP_PATH,
            'scripts': path.join(APP_PATH,'scripts'),
            'styles': path.join(APP_PATH,'styles'),
        }
    },
    // 插件项
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'index',
            template:'index.html'
        }),
        new webpack.DefinePlugin({
            PRODUCTION:JSON.stringify('production'),
        }),
        new FriendlyErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename:"[name].css",
            chunkFilename: "[id].css"
        }),
        //new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}

module.exports = config
