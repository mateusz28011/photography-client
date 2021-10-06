import axios from 'axios';
import {
  GET_VENDOR_REQUEST,
  GET_VENDOR_SUCCESS,
  GET_VENDOR_FAILURE,
  EDIT_VENDOR_REQUEST,
  EDIT_VENDOR_SUCCESS,
  EDIT_VENDOR_FAILURE,
  EDIT_VENDOR_ERROR_CLEAR,
  CREATE_VENDOR_PROFILE_REQUEST,
  CREATE_VENDOR_PROFILE_SUCCESS,
  CREATE_VENDOR_PROFILE_FAILURE,
  CREATE_VENDOR_PROFILE_ERROR_CLEAR,
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

export const editVendor = (vendorId, data) => async (dispach) => {
  try {
    dispach({ type: EDIT_VENDOR_REQUEST });
    const formData = new FormData();
    for (let key in data) {
      data[key] !== undefined && formData.append(key, data[key]);
    }
    const response = await axios.patch(`/profiles/${vendorId}/`, formData);
    dispach({ type: EDIT_VENDOR_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: EDIT_VENDOR_FAILURE,
      payload: error,
    });
  }
};

export const editVendorClearError = () => async (dispach) => {
  dispach({ type: EDIT_VENDOR_ERROR_CLEAR });
};

export const createVendorProfile = (data) => async (dispach) => {
  try {
    dispach({ type: CREATE_VENDOR_PROFILE_REQUEST });
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    const response = await axios.post(`/profiles/`, formData);
    dispach({ type: CREATE_VENDOR_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: CREATE_VENDOR_PROFILE_FAILURE,
      payload: error,
    });
  }
};

export const createVendorProfileClearError = () => async (dispach) => {
  dispach({ type: CREATE_VENDOR_PROFILE_ERROR_CLEAR });
};
