import React, { Component, PureComponent } from 'react'
import {get} from '../../ajaxServer'
import * as actionTypes from '../actionType'
import actionCreator from '../actionCreater'

class Index extends PureComponent{
    componentDidMount(){
        get({url:'/info/list'})
        get({url:'/info/email'})
    }
    render(){
        return <div>index</div>
    }
}

export default Index
