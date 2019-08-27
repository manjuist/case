/**
 * 功能：loading的状态
 */

import { handleActions } from 'redux-actions'
import {
    SHOWLOADING_COMMON,
    HIDELOADING_COMMON,
} from '../actions/actionTypes'

const initialState = {
    show: false
}

export default handleActions({
    [SHOWLOADING_COMMON]() {
        return {
            show: true
        }
    },
    
    [HIDELOADING_COMMON]() {
        return {
            show: false
        }
    }
}, initialState)
