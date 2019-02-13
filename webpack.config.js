const path              = require("path")
const webpack           = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
//const { injectBabelPlugin } = require('react-app-rewired')

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.join(ROOT_PATH, 'src')

const config = {
    devtool:'source-map',
    // 页面入口
    entry:{
        index:path.join(APP_PATH,'scripts/index.js')
    },
    // 文件输出
    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:'/',
        filename:'[name].bundle.js'
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
        modules:[path.resolve(__dirname, 'node_modules')],
        extensions:['.js', '.jsx', '.scss', '.less', '.css'],
        alias:{
            '@': ROOT_PATH,
            'app': APP_PATH,
            'scripts': path.join(APP_PATH,'scripts'),
            'styles': path.join(APP_PATH,'styles'),
        }
    },
    module:{
        // 加载器配置
        rules:[
            {
                test:/\.jsx?$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            compact:false,
                            cacheDirectory:true
                        }
                    }
                ]
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
    // 插件项
    plugins:[
        new DllReferencePlugin({
            manifest: require('./dist/react.manifest.json')
        }),
        //new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'index',
            template:'index.html',
            dllFile: "react.dll.js"
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
