import React from 'react';
import { v4 } from 'uuid';

const Error = ({ error }) => {
  return <p className='capitalize-first'>{error}</p>;
};

const ApiError = ({ error, name }) => {
  error = error && name ? error[name] : error[Object.keys(error)[0]];
  return error && Array.isArray(error) ? (
    error.map((error) => <Error error={error} key={v4()} />)
  ) : (
    <Error error={error} />
  );
};

export default ApiError;
