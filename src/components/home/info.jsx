import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { put } from 'redux-saga/effects'
import { showMoreHomeActionCreator, aaa } from '../../views/home/homeRedux'

function Info({ showMoreHome, aaaa }){
    return (
        <div>
            <div>马德玮</div>
            <div>deve_m@163.com</div>
            <div>github.com/manjuist</div>
            <button onClick={showMoreHome} />
            <button onClick={aaaa} />
            <button onClick={() => { put({ type: 'SHOW_MORE_HOME' }) }} />
        </div>
    )
}

Info.propTypes = {
    showMoreHome: PropTypes.func.isRequired,
    aaaa: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    setShowMoreHome: state.setShowMoreHome,
    aaaa: aaa,
})
const mapDispatchToProps = dispatch => ({
    showMoreHome: (payload) => { dispatch(showMoreHomeActionCreator(payload)) },
    dispatch,
})
export default connect(mapStateToProps, mapDispatchToProps)(Info)
