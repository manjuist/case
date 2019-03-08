import * as actionTypes from './actionType';

function actionCreator(payload) {
    return {
        type: actionTypes.LIST,
        payload,
    };
}

export default actionCreator;
