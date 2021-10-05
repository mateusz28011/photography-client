import { motion } from 'framer-motion';
import React from 'react';
import pageAnimation from '../pageAnimation';
import Introduction from './Introduction';
import Welcome from './Welcome';

const Home = () => {
  return (
    <motion.div className='bg-white shadow' {...pageAnimation}>
      <Welcome />
      <Introduction />
    </motion.div>
  );
};

export default Home;
