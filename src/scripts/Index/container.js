import React,{Component,PropTypes}                   from 'react';
import ReactDOM,{render}                             from 'react-dom';
import {HashRouter as Router,Route,Link,Switch}      from 'react-router-dom';
import {Provider,connect}                            from 'react-redux';
import actionCreator from './actionCreater'
import Loadable from 'react-loadable'

@connect(function(){return {a:1}},{function(){return{a:()=>{console.log(1)}}}})
class Index extends Component {
    render(){
        return <div>index{this.props.a}111</div>
    }
}

export default Index
