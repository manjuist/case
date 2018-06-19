import * as actionTypes from './Index/actionType';

function reducers(state, action) {
  switch (action.type) {
    case actionTypes.A:
      return 'A';
    case actionTypes.B:
      return 'B';
    default:
      return 'C';
  }
}

export default reducers;
