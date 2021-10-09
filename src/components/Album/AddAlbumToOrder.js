import { motion } from 'framer-motion';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAlbumInOrder } from '../../actions/order';

const AddAlbumToOrder = ({ albumId, setAlbumInOrder }) => {
  const { orderId } = useParams();

  const handleAddAlbumToOrder = (e) => {
    e.stopPropagation();
    setAlbumInOrder(orderId, albumId);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className='btn-basic w-full py-2 text-center mt-2 text-base lg:text-lg'
      onClick={handleAddAlbumToOrder}
    >
      Add to order
    </motion.div>
  );
};

export default connect(null, {
  setAlbumInOrder,
})(AddAlbumToOrder);
