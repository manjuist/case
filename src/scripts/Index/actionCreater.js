import * as actionTypes from './actionType';

function actionCreator(payload) {
  return {
    type: actionTypes.A,
    payload,
  };
}

export default actionCreator;
