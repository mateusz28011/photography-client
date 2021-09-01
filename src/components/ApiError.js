import React, { useEffect } from 'react';
import { v4 } from 'uuid';

export const Error = ({ error, center }) => {
  return error ? (
    <div className='bg-red-100 px-2 py-1 my-3 rounded'>
      <div
        className={
          'capitalize-first text-red-500 font-medium whitespace-pre-line ' +
          (center ? 'text-center' : '')
        }
      >
        {error}
      </div>
    </div>
  ) : null;
};

const ApiError = ({ error, name, center, clearFunc }) => {
  console.log(error);
  error =
    error && name
      ? error[name]
      : typeof error == 'string'
      ? error
      : error[Object.keys(error)[0]];

  useEffect(() => {
    return () => {
      error && clearFunc && clearFunc();
    };
  }, [error, clearFunc]);
  return error && Array.isArray(error) ? (
    error.map((error) => <Error error={error} center={center} key={v4()} />)
  ) : (
    <Error error={error} center={center} />
  );
};

export default ApiError;
