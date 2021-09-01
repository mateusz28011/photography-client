import React, { useEffect } from 'react';
import { v4 } from 'uuid';

export const Error = ({ error, center }) => {
  if (typeof error === 'object') error = error[Object.keys(error)[0]];

  return error ? (
    <div
      className={
        'capitalize-first text-red-500 bg-red-100 py-1 px-2 rounded font-medium whitespace-pre-line ' +
        (center ? 'text-center' : '')
      }
    >
      {error}
    </div>
  ) : null;
};

const ApiError = ({ error, name, center, clearFunc }) => {
  error = error && name ? error[0][name] : error;

  useEffect(() => {
    return () => {
      error && clearFunc && clearFunc();
    };
  }, [error, clearFunc]);

  return error ? (
    <div className='my-3 space-y-3'>
      {Array.isArray(error) ? (
        error.map((error) => <Error error={error} center={center} key={v4()} />)
      ) : (
        <Error error={error} center={center} />
      )}
    </div>
  ) : null;
};

export default ApiError;
