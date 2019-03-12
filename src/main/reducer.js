import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import * as actionTypes from './actionType';

const init = {
    text: 'text'
}

export default handleActions({
    [actionTypes.TEXT_MAIN](state, action){
        return Immutable.fromJS(state).set('text', action.payload).toJS()
    }
}, init);
