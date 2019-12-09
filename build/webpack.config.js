const path = require('path');
const webpack = require('webpack');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const { alias, URLMap } = require('../project.config');

const ROOT_PATH = path.resolve(__dirname, '..');
const APP_PATH = path.resolve(ROOT_PATH, './src/');
const DIST_PATH = path.resolve(ROOT_PATH, './dist/');
const { NODE_ENV } = process.env;
const newDeclear = (function (origin) {
  const tmp = { ...origin };
  for (const i in tmp) {
    if (Object.prototype.hasOwnProperty.call(tmp, i)) {
      tmp[i] = JSON.stringify(tmp[i]);
    }
  }
  return tmp;
}(URLMap[NODE_ENV]));

module.exports = {
  entry: {
    index: [path.join(APP_PATH, './main.js')],
  },
  output: {
    path: DIST_PATH,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolve: {
    alias,
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin(newDeclear),
    // 给经常使用的模块分配最小长度的ID
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 保证编译后的代码永远是对的，因为不对的话会自动停掉
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'eslint-loader',
            options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
              formatter: eslintFriendlyFormatter, // 指定错误报告的格式规范
            },
          },
        ],
        enforce: 'pre',
        include: [APP_PATH], // 指定检查的目录
      },
      {
        test: /\.jsx?$/,
        // use: 'happypack/loader?id=js',
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
        include: APP_PATH,
      },
      {
        test: /\.(png|jpg|jepg|gif)$/,
        use: 'url-loader?limit=8192&name=images/[name].[ext]',
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        use: 'url-loader',
      },
    ],
  },
};
