import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HomeLayout from 'app/layout/home'
import Sider from 'common/sider'
import HomeRoot from '../../router/home'
import { showMoreHomeActionCreator } from './homeRedux'

function Home(){
    return (
        <HomeLayout
            sider={<Sider />}
            content={<HomeRoot />}
        />
    )
}

const mapStateToProps = state => ({
    setShowMoreHome: state.setShowMoreHome,
})
const mapDispatchToProps = dispatch => ({
    showMoreHome: (payload) => { dispatch(showMoreHomeActionCreator(payload)) }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
