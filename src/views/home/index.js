import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HomeLayout from 'app/layout/home'
import Sider from 'common/sider'
import HomeRoot from '../../router/home'
import { showMoreHomeActionCreator } from './homeRedux'

function Sub(){
    return 'subsub'
}

function Home(){
    return ([
        <HomeLayout
            sider={<Sider />}
            content={<HomeRoot />}
            key={2}
        />,
        <Sub key={1} />
    ]
    )
}

const mapStateToProps = state => ({
    setShowMoreHome: state.setShowMoreHome,
})
const mapDispatchToProps = dispatch => ({
    showMoreHome: (payload) => { dispatch(showMoreHomeActionCreator(payload)) }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
