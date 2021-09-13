import axios from 'axios';
import {
  CREATE_ORDER_ERROR_CLEAR,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from '../actions/types';

export const createOrder = (formData, redirectToOrder) => async (dispach) => {
  try {
    dispach({ type: CREATE_ORDER_REQUEST });
    const response = await axios.post('/orders/', formData);
    dispach({ type: CREATE_ORDER_SUCCESS, payload: response.data });
    redirectToOrder(response.data.id);
  } catch (error) {
    dispach({
      type: CREATE_ORDER_FAILURE,
      payload: error,
    });
  }
};

export const createOrderClearError = () => async (dispach) => {
  dispach({ type: CREATE_ORDER_ERROR_CLEAR });
};
