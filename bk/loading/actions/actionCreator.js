import { createAction } from 'redux-actions'
import * as actionTypes from './actionTypes'

export const showLoading = createAction(actionTypes.SHOWLOADING_COMMON)
export const hideLoading = createAction(actionTypes.HIDELOADING_COMMON)
