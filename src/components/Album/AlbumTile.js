import React, { useState } from 'react';
import Tile from './Tile';
import { HiPhotograph } from 'react-icons/hi';
import { FaChevronLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import Loading from '../Loading';
import AlbumManager from './AlbumManager';

const AlbumTile = ({
  name,
  id: albumId,
  setAlbumId,
  parent,
  isCreator,
  loadingDeleteAlbum,
  loadingRenameAlbum,
}) => {
  const [showRenameAlbum, setShowRenameAlbum] = useState(false);

  const toggleShowRenameAlbum = () => {
    setShowRenameAlbum((prev) => !prev);
  };

  const handleAlbumClick = () => {
    setAlbumId(albumId);
  };

  return (
    <Tile clickFunc={handleAlbumClick}>
      {(loadingDeleteAlbum && loadingDeleteAlbum[String(albumId)]) ||
      (loadingRenameAlbum && loadingRenameAlbum[String(albumId)]) ? (
        <Loading />
      ) : (
        <>
          {parent && <FaChevronLeft className='chevron-left' />}
          <HiPhotograph className='w-full h-auto text-blue-600 filter drop-shadow-sm' />
          <div className='w-full h-1/2 flex flex-col items-center justify-center'>
            {!showRenameAlbum && (
              <div className='text-center my-auto w-32 sm:w-36 lg:w-48 truncate '>
                {name}
              </div>
            )}
            <div className={isCreator && parent && 'invisible'}>
              <AlbumManager
                isCreator={isCreator}
                albumId={albumId}
                name={name}
                showRenameAlbum={showRenameAlbum}
                toggleShowRenameAlbum={toggleShowRenameAlbum}
              />
            </div>
          </div>
        </>
      )}
    </Tile>
  );
};

const mapStateToProps = (state) => ({
  loadingDeleteAlbum: state.loading?.DELETE_ALBUM,
  loadingRenameAlbum: state.loading?.RENAME_ALBUM,
});

export default connect(mapStateToProps)(AlbumTile);
