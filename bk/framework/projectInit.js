/**
 * 功能：工程初始化
 * 作者：
 * 日期： 2018/5/11
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import axios from 'axios'
import { createHashHistory } from 'history'
import store from 'framework/store'
import RootRoutesView from '@/components/root'
import dialog from './dialog'

// 初始化工程
const projectInit = function (oContainer, callback = () => {}) {
    const history = createHashHistory()
    const getConfirmation = (msg, cb) => {
        dialog.confirm({
            content: <div>{msg}</div>,
            ok(){
                cb(true)
                dialog.hide()
            },
            cancel(){
                cb(false)
                dialog.hide()
            }
        })
    }
    
    history.listen(() => {
        const { CancelToken } = axios
        window.projectConf.source = CancelToken.source()
    })

    ReactDOM.render(
        <Provider store={store}>
            <Router hashHistory={history} getUserConfirmation={getConfirmation}>
                <RootRoutesView />
            </Router>
        </Provider>,
        oContainer,
        callback
    )
}

export default projectInit
