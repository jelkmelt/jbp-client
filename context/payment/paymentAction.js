import * as actionTypes from './paymentTypes';
import axios from 'axios';

export const grabIntendData = (data, dispatch) => {
  dispatch({
    type: actionTypes.COLLECT_INTEND_DATA,
    payload: data,
  });
};

export const clearIntendData = dispatch => {
  dispatch({
    type: actionTypes.CLEAR_INTEND_DATA,
  });
};

export const createPaymentIntend = async (data, dispatch) => {
  try {
    dispatch({
      type: actionTypes.CREATE_INTEND_REQUEST,
    });
    const res = await axios.post('url', data);

    dispatch({
      type: actionTypes.CREATE_INTEND_SUCCESSFULLY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_INTEND_FAILED,
    });
  }
};
