/**
 * Created by  on 2016/6/29.
 */
import { createAction } from 'redux-actions'
import * as actionTypes from './actionTypes'

export const showDialog = createAction(actionTypes.SHOWDIALOG_COMMON)
export const hideDialog = createAction(actionTypes.HIDEDIALOG_COMMON)
export const setFooter = createAction(actionTypes.SETFOOTER_COMMON)
