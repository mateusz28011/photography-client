import React from 'react';

const Loading = ({
  className,
  paddingY = 0,
  size = 12,
  stroke = 40,
  cover,
}) => {
  return cover ? (
    <div
      className={
        'absolute bg-white w-full h-full left-0 top-0' +
        (className ? ` ${className}` : '')
      }
    >
      <div className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
        <lord-icon
          src='https://cdn.lordicon.com/xjovhxra.json'
          trigger='loop'
          colors='primary:#2563EB'
          stroke={stroke}
          style={{
            width: `${size}rem`,
            height: `${size}rem`,
            paddingTop: `${paddingY}rem`,
            paddingDown: `${paddingY}rem`,
          }}
        ></lord-icon>
      </div>
    </div>
  ) : (
    <div
      className={
        'h-full w-full flex items-center justify-center' +
        (className ? ` ${className}` : '')
      }
    >
      <lord-icon
        src='https://cdn.lordicon.com/xjovhxra.json'
        trigger='loop'
        colors='primary:#2563EB'
        stroke={stroke}
        style={{
          width: `${size}rem`,
          height: `${size}rem`,
          paddingTop: `${paddingY}rem`,
          paddingDown: `${paddingY}rem`,
        }}
      ></lord-icon>
    </div>
  );
};

export default Loading;
