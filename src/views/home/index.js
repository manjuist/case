import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HomeLayout from 'app/layout/home'
import Info from 'components/home/info'
import Other from 'components/home/other'
import Profile from 'components/home/profile'
import Project from 'components/home/project'
import Skill from 'components/home/skill'
import Tech from 'components/home/tech'
import Work from 'components/home/work'
import Sider from 'common/sider'
import { showMoreHomeActionCreator } from './homeRedux'

const contentList = {
    info: <Info />,
    other: <Other />,
    profile: <Profile />,
    project: <Project />,
    skill: <Skill />,
    tech: <Tech />,
    work: <Work />,
}
function Home({ match: { params: { id } } }){
    return (
        <HomeLayout
            sider={<Sider />}
            content={contentList[id]}
        />
    )
}

Home.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    })
}

Home.defaultProps = {
    match: { params: { id: '' } }
}

const mapStateToProps = state => ({
    setShowMoreHome: state.setShowMoreHome,
})
const mapDispatchToProps = dispatch => ({
    showMoreHome: (payload) => { dispatch(showMoreHomeActionCreator(payload)) }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
