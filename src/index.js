import React from 'react'
import { 
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import { HashRouter as Router, Switch } from 'react-router-dom'
import RouteList from 'app/base/Router'
import Reducers from 'app/base/Reducers'
import Header from 'app/common/Header'

const middleWare = [thunk, logger]
const store = createStore(
    combineReducers({ ...Reducers }),
    applyMiddleware(...middleWare),
)

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
)
