import React from 'react';

const Loading = ({ className, size = 32, borderWidth = 8 }) => {
  return (
    <div
      className={
        'h-full w-full flex items-center justify-center ' +
        (typeof className === 'string' ? className : '')
      }
    >
      <div
        className={`border-${borderWidth} loader rounded-full animate-spin w-${parseInt(
          size
        )} h-${parseInt(size)}`}
      ></div>
    </div>
  );
};

export default Loading;
