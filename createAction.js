import {createAction} from 'redux-actions'
import { bindActionCreators } from 'redux';
import Immutable from 'immutable'
import Config from 'config';
import axios from 'api/axios';
import store from 'store'

const {dispatch} = store;
const URL_PREFIX = Config.env[Config.scheme].prefix;

export const createActions = function(opts){
  const optsMap = Immutable.fromJS(opts);
  return optsMap.map((v,k)=>{
    if (typeof v !== 'string') {
      if(!v.get('type')){
        return function(){
          return axios[v.get('method')](v.get('url'))
        }
      }
      return function(){
        axios[v.get('method')||'get'](v.get('url')).then(res=>{
          dispatch(createAction(v.get('type'))(res.data))
        })
      }
    }else{
      return function(data){
        dispatch(createAction(v)(data))
      }
    }
  }).toJS()
}
