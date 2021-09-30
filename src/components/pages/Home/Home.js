import React from 'react';
import polaroid from './graphics/undraw_fashion_photoshoot_mtq8.svg';

const Home = () => {
  return (
    <div
      style={{ maxHeight: '76rem' }}
      className='bg-white flex-auto p-5 md:p-10 flex flex-col justify-evenly relative lg:grid grid-cols-6 grid-rows-6 items-center max-h overflow-x-hidden'
    >
      <div className='text-center text-5xl md:text-6xl xl:text-7xl font-medium font-sans relative col-start-1 col-end-5 row-start-1 row-end-3'>
        Welcome to <span className='text-blue-600 font-bold'>PhotoBay</span>
        <div className='text-base md:text-lg  lg:text-xl mt-4 md:mt-3 text-gray-600'>
          Place where photographers and their customers can drop the anchors
        </div>
      </div>
      <img
        src={polaroid}
        alt=''
        className='col-start-2 col-end-7 row-start-1 row-end-7 relative xl:left-36 xl:top-10 mt-3'
      />
    </div>
  );
};

export default Home;
