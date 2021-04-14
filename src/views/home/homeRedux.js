import { put } from 'redux-saga/effects';

export const SHOW_MORE_HOME = 'SHOW_MORE_HOME'

const initialState = false 
export const setShowMoreHome = (state, action) => {
    const handlers = {
        SHOW_MORE_HOME: action.payload
    }
    return handlers[action.type] || initialState
}

export const showMoreHomeActionCreator = payload => ({
    type: SHOW_MORE_HOME,
    payload
})

export function* aaa(){
    yield put({ type: 'SHOW_MORE_HOME' })
}
