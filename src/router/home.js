import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import url from 'config/url'
import Info from 'components/home/info'
import Other from 'components/home/other'
import Profile from 'components/home/profile'
import Project from 'components/home/project'
import Skill from 'components/home/skill'
import Tech from 'components/home/tech'
import Work from 'components/home/work'

function RouteList(){
    return (
        <Switch>
            <Route exact path={url.info.path} component={Info} />
            <Route exact path={url.other.path} component={Other} />
            <Route exact path={url.profile.path} component={Profile} />
            <Route exact path={url.project.path} component={Project} />
            <Route exact path={url.skill.path} component={Skill} />
            <Route exact path={url.tech.path} component={Tech} />
            <Route exact path={url.work.path} component={Work} />
            <Redirect to={url.info.path} />
        </Switch>
    )
}

export default RouteList
