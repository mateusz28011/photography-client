import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { motion } from 'framer-motion';

const ManagerButtons = ({
  children,
  showRename,
  handleToggleRename,
  handleDeleteAlbum,
}) => {
  return (
    <div className='flex space-x-2 pt-2 '>
      <motion.div
        whileHover={{
          scale: 1.2,
        }}
      >
        <AiOutlineEdit
          onClick={handleToggleRename}
          size='2rem'
          strokeWidth='-1rem'
          className={
            ' rounded-full transition-colors duration-100 p-0.5 cursor-pointer ' +
            (showRename ? 'bg-blue-600 text-white' : 'text-blue-600')
          }
        />
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.2,
        }}
      >
        <AiOutlineDelete
          onClick={handleDeleteAlbum}
          size='2rem'
          strokeWidth='-1rem'
          className='text-blue-600  rounded-full transition-colors cursor-pointer duration-100 p-0.5'
        />
      </motion.div>
      {children}
    </div>
  );
};

export default ManagerButtons;