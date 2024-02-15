import * as Actions from './paymentTypes';

const paymentReducer = (state, action) => {
  switch (action.type) {
    case Actions.COLLECT_INTEND_DATA:
      return {
        ...state,
        packageData: action.payload,
      };
    case Actions.CLEAR_INTEND_DATA:
      return {
        ...state,
        packageData: null,
      };
    case Actions.CREATE_INTEND_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case Actions.CREATE_INTEND_SUCCESSFULLY:
      return {
        ...state,
        status: 'idle',
        intendData: action.payload,
      };
    case Actions.CREATE_INTEND_FAILED:
      return {
        ...state,
        status: 'error',
      };
    default:
      return state;
  }
};

export default paymentReducer;
