import { motion } from 'framer-motion';
import { FaChevronLeft } from 'react-icons/fa';
import React from 'react';

const BackButton = ({ onClick }) => {
  return (
    <motion.div
      className='chevron-left'
      onClick={onClick}
      whileHover={{
        scale: 1.2,
      }}
    >
      <FaChevronLeft className='w-6 h-auto sm:w-8 lg:w-10' />
    </motion.div>
  );
};

export default BackButton;
