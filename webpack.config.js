const path              = require("path");
const webpack           = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//const { injectBabelPlugin } = require('react-app-rewired');
const config = {
    devtool:'source-map',
	// 页面入口
	entry:{
		index:path.resolve(__dirname,'src/index.js')
	},
	// 文件输出
	output:{
		path:path.resolve(__dirname,'dist'),
        publicPath:'/',
		filename:'[name].bundle.js'
	},
    devServer:{
        hot:true,
        inline:true,//inline模式
        contentBase:path.join(__dirname,'dist'),
        compress:true,
        port:3000
    },
    //resolve:{
        //alias{}
    //},
	module:{
		// 加载器配置
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            compact:false
                        }
                    }
                ]
            },
            {
                test:/\.(css|scss)$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
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
                })
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
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'index',
            template:'index.ejs'
        }),
        new webpack.DefinePlugin({
            PRODUCTION:JSON.stringify('production'),
        }),
        new ExtractTextPlugin('style.css'),
        //new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('common'),
    ]
}

module.exports = config;
//module.exports = function override(config, env) {
      //config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
        //return config;
      //};
