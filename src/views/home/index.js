import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TestErr from 'views/test-err'
import { showMoreHomeActionCreator } from './homeRedux'

function Home(){
    return ([<TestErr key={1} />])
}

const mapStateToProps = state => ({
    setShowMoreHome: state.setShowMoreHome,
})
const mapDispatchToProps = dispatch => ({
    showMoreHome: (payload) => { dispatch(showMoreHomeActionCreator(payload)) }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
