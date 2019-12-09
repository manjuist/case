const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const postcssBugFix = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const poxtcssPx2Rem = require('postcss-pxtorem');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = require('./webpack.config');
const { publicPathMap, resources } = require('../project.config');

const ROOT_PATH = path.resolve(__dirname, '..');
const { NODE_ENV } = process.env;
const mode = (NODE_ENV === 'development' ? NODE_ENV : 'production');
const publicPath = publicPathMap[NODE_ENV];

module.exports = merge(webpackConfig, {
  mode,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new HtmlwebpackPlugin({
      title: '积分商城',
      filename: 'index.html',
      // favicon: 'src/images/logo_artist.ico',
      template: path.resolve(ROOT_PATH, './index.html'),
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
      myStaticPath: publicPath,
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new OptimizeCSSAssetsPlugin(), new UglifyJsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: [
                postcssBugFix,
                poxtcssPx2Rem({
                  rootValue: 75,
                  propWhiteList: [],
                }),
              ],
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources,
            },
          },
        ],
      },
    ],
  },
});
