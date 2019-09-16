/**
 * Created by  on 2017/6/29.
 * 非业务底层无扩展封装
 */

// 公共js
import axios from 'axios'
import { AppContainer, hot } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import moment from 'moment'
import pathToRegExp from 'path-to-regexp'
import { combineReducers } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import _ from 'lodash'
import {
    NavLink,
    Link,
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
    withRouter
} from 'react-router-dom'
import { createSelector } from 'reselect'
import Helper from '@/common'
import PureComponent from './base/ReactComponentBase'

const noop = function () {}

const EmptyComponent = () => null

const packageLogInfo = function (OperateCondition, opId) {
    const { innerWidth, innerHeight, screen: {
        availWidth,
        availHeight
    } } = window
    const { userAgent, language, browserLanguage } = window.navigator
    const browserInfo = userAgent.toLowerCase()
    let browser = {
        browserName: 'Other',
        browserVersion: '未知'
    }
    
    // ie
    if (browserInfo.indexOf('msie') >= 0) {
        const ver = browserInfo.match(/msie ([\d.]+)/)[1]
        browser = { browserName: 'IE', browserVersion: ver }
    }
    // firefox
    if (browserInfo.indexOf('firefox') >= 0) {
        const ver = browserInfo.match(/firefox\/([\d.]+)/)[1]
        browser = { browserName: 'Firefox', browserVersion: ver }
    }
    // Chrome
    if (browserInfo.indexOf('chrome') >= 0) {
        const ver = browserInfo.match(/chrome\/([\d.]+)/)[1]
        browser = { browserName: 'Chrome', browserVersion: ver }
    }
    // Opera
    if (browserInfo.indexOf('opera') >= 0) {
        const ver = browserInfo.match(/opera.([\d.]+)/)[1]
        browser = { browserName: 'Opera', browserVersion: ver }
    }
    // Safari
    if (browserInfo.indexOf('Safari') >= 0) {
        const ver = browserInfo.match(/version\/([\d.]+)/)[1]
        browser = { browserName: 'Safari', browserVersion: ver }
    }
    
    return {
        Browser: browser.browserName,
        BrowserVersion: browser.browserVersion,
        Language: language || browserLanguage,
        Location: window.location.href,
        Resolution: `${innerWidth}x${innerHeight}`,
        WindowSize: `${availWidth}x${availHeight}`,
        OperateCondition: typeof OperateCondition === 'object' ? JSON.stringify(OperateCondition) : OperateCondition,
        opId
    }
}

export {
    axios,
    classNames,
    Helper,
    React,
    ReactDOM,
    PropTypes,
    PureComponent,
    Immutable,
    _,
    moment,
    pathToRegExp,
    combineReducers,
    connect,
    createSelector,
    Router,
    Route,
    withRouter,
    NavLink,
    Link,
    Redirect,
    Switch,
    AppContainer,
    hot,
    noop,
    EmptyComponent,
    packageLogInfo
}
