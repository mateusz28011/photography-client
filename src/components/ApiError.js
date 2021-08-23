import React from 'react';
import { v4 } from 'uuid';

export const Error = ({ error }) => {
  return error ? (
    <div className='bg-red-100 px-2 py-1 my-3 rounded'>
      <div className='capitalize-first text-red-500 font-medium whitespace-pre-line'>
        {error}
      </div>
    </div>
  ) : null;
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
