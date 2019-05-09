import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { showMoreHomeActionCreator } from './homeRedux'

function Home({ setShowMoreHome, showMoreHome, match: { params: { id } } }){
    return (
        <button
            type="button"
            onClick={
                () => { showMoreHome(true) }
            }
        >
            {`${setShowMoreHome}${id}`}
        </button>
    )
}

Home.propTypes = {
    setShowMoreHome: PropTypes.bool.isRequired,
    showMoreHome: PropTypes.func.isRequired,
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
