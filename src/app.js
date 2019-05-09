import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import Store from 'app/store'
import Root from 'app/layout'
import Sider from 'common/sider'
import Nav from 'common/nav'
import RouteList from './router'

render(
    <Provider store={Store}>
        <Router>
            <Root
                header={<Nav />}
                sider={<Sider />}
                content={<RouteList />}
            />
        </Router>
    </Provider>,
    document.getElementById('root'),
)
