import axios from 'axios';
import {
  GET_VENDOR_REQUEST,
  GET_VENDOR_SUCCESS,
  GET_VENDOR_FAILURE,
} from '../actions/types';

export const getVendor = (vendorId) => async (dispach) => {
  try {
    dispach({ type: GET_VENDOR_REQUEST });
    const response = await axios.get(`/profiles/${vendorId}/`);
    dispach({ type: GET_VENDOR_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: GET_VENDOR_FAILURE,
      payload: error,
    });
  }
};
