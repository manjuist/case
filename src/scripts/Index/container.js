import React,{Component,PropTypes}                   from 'react';
import ReactDOM,{render}                             from 'react-dom';
import {HashRouter as Router,Route,Link,Switch}      from 'react-router-dom';
import {Provider,connect}                            from 'react-redux';
import actionCreator from './actionCreater'
import Loadable from 'react-loadable'
import Index from './Components'

export default connect(function(){return {a:'kkk'}},{function(){return{a:()=>{console.log(1)}}}})(Index)
