import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
// delete axios.defaults.headers.common['Accept'];
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  // remember to make this async as the store action will
  // need to be awaited
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url.includes('/dj-rest-auth/token/refresh/')
    ) {
      // store.commit('clearUserData');
      // router.push('/login');
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // await execution of the store async action before
      // return
      await axios.post('/dj-rest-auth/token/refresh/');
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
