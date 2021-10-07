import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AlbumManager from './AlbumManager';
import Loading from '../Loading';
import { createErrorMessageSelector } from '../../selectors';
import { AiOutlineLock } from 'react-icons/ai';
import { motion } from 'framer-motion';

const CurrentAlbumInfo = ({
  name,
  returnToMyAlbums,
  isCreator,
  isPublic,
  albumId,
  history,
  showEditAlbum,
  toggleShowEditAlbum,
  loadingDeleteAlbum,
  loadingEditAlbum,
  error,
}) => {
  const [clickedDelete, setClickedDelete] = useState(false);

  const setClickedDeleteToTrue = () => {
    setClickedDelete(true);
  };

  useEffect(() => {
    if (
      clickedDelete &&
      !error &&
      loadingDeleteAlbum &&
      loadingDeleteAlbum[String(albumId)] === false
    ) {
      returnToMyAlbums ? returnToMyAlbums() : history.push('/');
    }
  }, [
    clickedDelete,
    error,
    loadingDeleteAlbum,
    albumId,
    returnToMyAlbums,
    history,
  ]);

  const isLoading = () => {
    return (
      (loadingDeleteAlbum && loadingDeleteAlbum[String(albumId)]) ||
      (loadingEditAlbum && loadingEditAlbum[String(albumId)])
    );
  };

  return (
    <>
      <motion.div
        layout
        className='bg-white shadow rounded-lg text-center py-3 font-base text-lg text-gray-600 relative'
      >
        <motion.div layout className='flex items-center justify-center'>
          Current album:
          <div className='ml-2 font-medium text-xl  text-blue-600'>{name}</div>
          {!isPublic && (
            <AiOutlineLock className='ml-1.5 text-blue-600 w-5 h-5' />
          )}
        </motion.div>
        {isLoading() && <Loading className='rounded-lg' size={7} cover />}
        <motion.div
          layout
          className={
            'w-full flex flex-col items-center justify-center' +
            (showEditAlbum ? ' mt-3 space-y-3' : '')
          }
        >
          <AlbumManager
            isCreator={isCreator}
            albumId={albumId}
            name={name}
            isPublic={isPublic}
            showEditAlbum={showEditAlbum}
            toggleShowEditAlbum={toggleShowEditAlbum}
            isInsideAlbum
            setClickedDeleteToTrue={setClickedDeleteToTrue}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

const errorSelector = createErrorMessageSelector(['DELETE_ALBUM']);

const mapStateToProps = (state) => ({
  loadingDeleteAlbum: state.loading?.DELETE_ALBUM,
  loadingEditAlbum: state.loading?.EDIT_ALBUM,
  error: errorSelector(state),
});

export default connect(mapStateToProps)(CurrentAlbumInfo);
