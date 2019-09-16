/**
 * 功能：所有状态
 * 作者：安超
 * 日期：2018/7/4
 */
import { handleActions } from 'framework'
import { Immutable } from 'framework/Util'
import config from 'conf'
import * as actionTypes from '../actions/actionTypes'

const { constant } = config

const inintialState = Immutable.fromJS({
    username: '',
    userType: constant.userTypes[1]
})

const loginReducer = handleActions({
    [actionTypes.SET_USER_INFO_LOGIN]: {
        success: (state, action) => {
            const { username, userType } = action.payload
            return state.set('username', username)
                .set('userType', constant.userTypes[parseInt(userType, 10)])
        }
    }
}, inintialState)

export default loginReducer
