/**
 * 功能： dialog视图
 */

import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Dialog from '../components'

const mapStateToProps = state => state.dialog
const selector = createSelector([mapStateToProps], dialogState => ({
    ...dialogState
}))

export default connect(selector)(Dialog)
