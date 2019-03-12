import { createAction } from 'redux-actions';
import * as actionTypes from './actionType';

const actionCreator = dispatch => ({
    hehe(a){
        dispatch(createAction(actionTypes.TEXT_MAIN)(a)) 
    }
})

export default actionCreator;
