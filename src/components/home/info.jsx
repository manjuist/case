import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { showMoreHomeActionCreator } from '../../views/home/homeRedux'

function Info({ showMoreHome }){
    return (
        <div>
            <div>马德玮</div>
            <div>deve_m@163.com</div>
            <div>github.com/manjuist</div>
            <button onClick={showMoreHome} >1</button>
        </div>
    )
}

Info.propTypes = {
    showMoreHome: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    setShowMoreHome: state.setShowMoreHome,
})
const mapDispatchToProps = dispatch => ({
    showMoreHome: (payload) => { dispatch(showMoreHomeActionCreator(payload)) },
})
export default connect(mapStateToProps, mapDispatchToProps)(Info)
