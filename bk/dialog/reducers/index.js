/**
 * 功能：弹窗的状态
 */

import { handleActions } from 'redux-actions'
import {
    SHOWDIALOG_COMMON,
    HIDEDIALOG_COMMON,
    SETFOOTER_COMMON
} from '../actions/actionTypes'

const initialState = {
    title: '',
    content: null,
    width: 500,
    dialogType: 'confirm',
    show: false,
    footer: null
}

export default handleActions({
    [SHOWDIALOG_COMMON](state, action) {
        return {
            ...state,
            ...action.payload,
            show: true
        }
    },
    
    [HIDEDIALOG_COMMON](state) {
        return {
            ...state,
            title: '',
            content: null,
            show: false,
        }
    },
    
    [SETFOOTER_COMMON](state, action) {
        return {
            ...state,
            ...action.payload
        }
    }
}, initialState)
