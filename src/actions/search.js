import axios from 'axios';
import {
  SEARCH_REQUEST,
  //   SEARCH_FILTER_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from '../actions/types';
import queryString from 'query-string';

const search = async (dispach, url) => {
  try {
    dispach({ type: SEARCH_REQUEST });
    const response = await axios.get(url);
    dispach({ type: SEARCH_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: SEARCH_FAILURE,
      payload: error,
    });
  }
};

export const searchProfiles = (query) => async (dispach) => {
  search(dispach, `/profiles/${query}`);
};

export const loadNext = (next) => async (dispach) => {
  next && search(dispach, next);
};

export const loadPrevious = (previous) => async (dispach) => {
  previous && search(dispach, previous);
};
//   try {
//     dispach({ type: SEARCH_REQUEST });
//     const response = await axios.get('/profiles/');
//     dispach({ type: SEARCH_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispach({
//       type: SEARCH_FAILURE,
//       payload: error,
//     });
//   }
