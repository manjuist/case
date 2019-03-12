import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import actionCreator from './actionCreater'
import Main from './index'

const indexState = state => state.mainState.text
const indexSelector = createSelector([indexState], (text) => {
    const p = 'p'
    return { text, p }
})

export default connect(indexSelector, actionCreator)(Main)
