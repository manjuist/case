const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin');
// const { injectBabelPlugin } = require('react-app-rewired')

const ROOT_PATH = path.resolve(__dirname, '..')
const mode = process.env.NODE_ENV

const config = {
    mode,
    context: path.resolve(ROOT_PATH),
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
            path: path.join(ROOT_PATH, 'dll', '[name].manifest.json')
        })
    ]
}
module.exports = config
