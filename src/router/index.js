import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import url from 'config/url'
import Home from 'views/home'
import Portal from 'views/portal'
import FLIP from 'views/flip'

function RouteList(){
    return (
        <Switch>
            <Route path={url.home.path} component={Home} />
            <Route path={url.portal.path} component={Portal} />
            <Route path={url.flip.path} component={FLIP} />
            <Redirect to={url.info.path} />
        </Switch>
    )
}

export default RouteList
