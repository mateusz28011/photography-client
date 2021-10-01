import React from 'react';
import Introduction from './Introduction';
import Welcome from './Welcome';

const Home = () => {
  return (
    <div className='bg-white'>
      <Welcome />
      <Introduction />
    </div>
  );
};

export default Home;
