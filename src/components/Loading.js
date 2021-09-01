import React from 'react';

const Loading = ({ className }) => {
  return (
    <div
      className={
        'h-full w-full flex items-center justify-center ' +
        (typeof className === 'string' ? className : '')
      }
    >
      <div className='border-8 loader rounded-full animate-spin w-32 h-32'></div>
    </div>
  );
};

export default Loading;
