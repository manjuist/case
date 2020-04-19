import { createAction } from 'redux-actions'
import Immutable from 'immutable'
import axios from 'axios';
import store from 'store'

const { dispatch } = store;

const createActions = function (opts){
    const optsMap = Immutable.fromJS(opts);
    return optsMap.map((v) => {
        if (typeof v !== 'string') {
            if (!v.get('type')){
                return function (){
                    return axios[v.get('method')](v.get('url'))
                }
            }
            return function (){
                axios[v.get('method') || 'get'](v.get('url')).then((res) => {
                    dispatch(createAction(v.get('type'))(res.data))
                })
            }
        }
        return function (data){
            dispatch(createAction(v)(data))
        }
    }).toJS()
}

export default createActions
