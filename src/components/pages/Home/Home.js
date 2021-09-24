import React from 'react';
import Loading from '../../Loading';
import polaroid from './graphics/undraw_Polaroid.svg';
const Home = () => {
  return (
    <div className='bg-white'>
      <img src={polaroid} alt='' />
      <Loading />
    </div>
  );
};

export default Home;
