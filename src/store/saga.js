/**
 * name: saga.js
 * author: Deve
 * date: 2021-04-13
 */

import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';

function* saga1(args){
    const data = call(fetch, args);
    yield put({ type: 'S1', data })
}

function* allSage1(){
    yield takeEvery('All', saga1)
}

function* allSage(){
    yield takeLatest('All', saga1)
}

export { allSage1 };
export default allSage;
