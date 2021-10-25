import { motion } from 'framer-motion';
import React from 'react';
import { connect } from 'react-redux';
import { setAlbumInOrderClearError } from '../../../actions/order';
import {
  createErrorMessageSelector,
  createLoadingSelector,
} from '../../../selectors';
import Album from '../../Album/Album';
import ApiError from '../../ApiError';
import Loading from '../../Loading';
import Albums from '../Albums/Albums';

const OrderAlbum = ({
  albumId,
  isVendor,
  loading,
  error,
  setAlbumInOrderClearError,
}) => {
  return (
    <div className='relative'>
      {error && (
        <ApiError error={error} center clearFunc={setAlbumInOrderClearError} />
      )}
      {isVendor && !albumId ? (
        <Albums inOrder />
      ) : (
        <>
          <motion.div
            layout
            className='bg-white shadow rounded-lg text-center py-3 my-3 font-medium text-xl text-gray-600'
          >
            My order album
          </motion.div>
          <Album albumId={albumId} hideInfo={!isVendor} inOrder={true} />
        </>
      )}
      {loading && <Loading cover />}
    </div>
  );
};

const loadingSelector = createLoadingSelector(['SET_ALBUM_IN_ORDER']);
const errorSelector = createErrorMessageSelector(['SET_ALBUM_IN_ORDER']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
});

export default connect(mapStateToProps, {
  setAlbumInOrderClearError,
})(OrderAlbum);
