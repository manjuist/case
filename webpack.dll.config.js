const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin');
// const { injectBabelPlugin } = require('react-app-rewired')

const ROOT_PATH = path.resolve(__dirname)

const config = {
    // 页面入口
    entry: {
        react: ['react', 'react-dom', 'antd'],
    },
    // 文件输出
    output: {
        path: path.resolve(ROOT_PATH, 'dll'),
        publicPath: '/',
        library: '_dll_[name]',
        filename: '[name].dll.js'
    },
    // 插件项
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dll', '[name].manifest.json')
        })
    ]
}
module.exports = config
