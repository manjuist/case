import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import Store from 'app/store'
import immer from 'immer'
import 'common/css'
import RouteList from 'app/router'

import TestContext from 'views/context'

window.immer = immer;

render(
    <Provider store={Store}>
        <Router>
            <TestContext.Provider value="456">
                <RouteList />
            </TestContext.Provider>
        </Router>
    </Provider>,
    document.getElementById('root'),
)
