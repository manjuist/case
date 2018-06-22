import React, { Component, pureComponent } from 'react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import Immutable from 'immutable';
import ReactDOM, { render } from 'react-dom';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import RouteList from './scripts/Router';
import Reducers from './scripts/Reducers';
import Header from './scripts/Common/Header';
import './styles/styles.scss';

const middleWare = [thunk, logger];
const store = createStore(
  combineReducers({ Reducers }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleWare),
);

window.store = store;

render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Switch>
          <RouteList />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);