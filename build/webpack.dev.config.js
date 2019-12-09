const path = require('path');
/* eslint-disable */
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const postcssBugFix = require('postcss-flexbugs-fixes');
const poxtcssPx2Rem = require('postcss-pxtorem');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/* eslint-enable */

const manifest = require('../dll/vendor.manifest.json');
const webpackConfig = require('./webpack.config.js');
const { publicPathMap, resources, proxy } = require('../project.config');

const ROOT_PATH = path.resolve(__dirname, '..');
// const APP_PATH = path.resolve(ROOT_PATH, './src/');
// const DIST_PATH = path.resolve(ROOT_PATH, './dist/');
const { NODE_ENV } = process.env;
const mode = (NODE_ENV === 'development' ? NODE_ENV : 'production');
const publicPath = publicPathMap[NODE_ENV];
const openPath = 'http://dev.lvyuetravel.com:8088';

module.exports = merge(webpackConfig, {
  mode,
  output: {
    publicPath,
  },
  devtool: 'source-map',
  plugins: [
    new DllReferencePlugin({
      manifest,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(ROOT_PATH, 'dll/vendor.dll.js'),
        to: path.resolve(ROOT_PATH, 'dist/vendor.dll.js'),
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: openPath,
    }),
    new HtmlwebpackPlugin({
      title: 'PMS后台',
      filename: 'index.html',
      // favicon: 'src/images/logo_artist.ico',
      template: path.resolve(ROOT_PATH, './index.html'),
      inject: true,
      dllFile: '/vendor.dll.js',
      myStaticPath: publicPath,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 8088,
    hot: true,
    inline: true,
    progress: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    overlay: {
      errors: true,
    },
    proxy,
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                postcssBugFix,
                poxtcssPx2Rem({
                  rootValue: 75,
                  propWhiteList: [],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
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
