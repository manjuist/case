import React,{Component,PropTypes}                   from 'react';
import ReactDOM,{render}                             from 'react-dom';
import {HashRouter as Router,Route,Link,Switch}      from 'react-router-dom';
import Index from './Index/container';

const RouteList = () => (
    <div>
        <Route exact path='*' component={Index} />
    </div>
);
export default RouteList;
