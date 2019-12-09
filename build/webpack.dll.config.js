const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

const ROOT_PATH = path.resolve(__dirname, '..');

const config = {
  mode: 'development',
  context: path.resolve(ROOT_PATH),
  // 页面入口
  entry: {
    vendor: ['react', 'react-dom', 'lvyue-design'],
  },
  // 文件输出
  output: {
    path: path.resolve(ROOT_PATH, 'dll'),
    publicPath: '/',
    library: '_dll_[name]',
    filename: '[name].dll.js',
  },
  // 插件项
  plugins: [
    new DllPlugin({
      name: '_dll_[name]',
      path: path.join(ROOT_PATH, 'dll', '[name].manifest.json'),
    }),
  ],
};
module.exports = config;
