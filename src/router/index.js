import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import url from 'config/url'
import Home from 'views/home'
import DrawingBoard from 'views/drawing-board'
import FLIP from 'views/flip'
import G6 from 'views/g6'

function RouteList(){
    return (
        <Switch>
            <Route path={url.g6.path} component={G6} />
            <Route path={url.home.path} component={Home} />
            <Route path={url.drawingBoard.path} component={DrawingBoard} />
            <Route path={url.flip.path} component={FLIP} />
            <Redirect to={url.g6.path} />
        </Switch>
    )
}

export default RouteList
