import axios from 'axios';
import {
  CREATE_ORDER_ERROR_CLEAR,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_COST_ERROR_CLEAR,
  UPDATE_ORDER_COST_FAILURE,
  UPDATE_ORDER_COST_REQUEST,
  UPDATE_ORDER_COST_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR_CLEAR,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from '../actions/types';

export const getOrder = (orderId) => async (dispach) => {
  try {
    dispach({ type: GET_ORDER_REQUEST });
    const response = await axios.get(`/orders/${orderId}/`);
    dispach({ type: GET_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: GET_ORDER_FAILURE,
      payload: error,
    });
  }
};

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

export const updateOrderStatus = (orderId, formData) => async (dispach) => {
  try {
    dispach({ type: UPDATE_ORDER_STATUS_REQUEST });
    const response = await axios.patch(`/orders/${orderId}/`, formData);
    dispach({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: UPDATE_ORDER_STATUS_FAILURE,
      payload: error,
    });
  }
};

export const updateOrderStatusClearError = () => async (dispach) => {
  dispach({ type: UPDATE_ORDER_STATUS_ERROR_CLEAR });
};

export const updateOrderCost = (orderId, formData) => async (dispach) => {
  try {
    dispach({ type: UPDATE_ORDER_COST_REQUEST });
    const response = await axios.patch(`/orders/${orderId}/`, formData);
    dispach({ type: UPDATE_ORDER_COST_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: UPDATE_ORDER_COST_FAILURE,
      payload: error,
    });
  }
};

export const updateOrderCostClearError = () => async (dispach) => {
  dispach({ type: UPDATE_ORDER_COST_ERROR_CLEAR });
};
