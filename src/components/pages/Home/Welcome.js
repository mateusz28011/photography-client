import React from 'react';
import welcomeGraphic from './graphics/undraw_fashion_photoshoot_mtq8.svg';

const Welcome = () => {
  return (
    <section
      style={{ maxHeight: '76rem' }}
      className='p-5 md:p-10 flex flex-col justify-evenly lg:grid grid-cols-6 grid-rows-6 items-center overflow-x-hidden relative min-h-screen'
    >
      <h1 className='text-center text-5xl md:text-6xl xl:text-7xl font-medium font-sans col-start-1 col-end-5 row-start-1 row-end-3 z-10'>
        Welcome to <span className='text-blue-600 font-bold'>PhotoBay</span>
        <h3 className='text-base md:text-lg  lg:text-xl mt-4 md:mt-3 text-gray-600'>
          Place where photographers and their customers can drop the anchor
        </h3>
      </h1>
      <img
        src={welcomeGraphic}
        alt=''
        className='col-start-2 col-end-7 row-start-1 row-end-7 relative lg:left-36 lg:top-10 mt-3 mb-20 filter drop-shadow'
      />
      <svg
        preserveAspectRatio='none'
        viewBox='0 0 1680 40'
        className='absolute w-full bottom-0'
      >
        <path d='M0 40h1680V30S1340 0 840 0 0 30 0 30z' fill='#2563EB'></path>
      </svg>
    </section>
  );
};

export default Welcome;
