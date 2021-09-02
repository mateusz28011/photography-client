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
          {parent && (
            <FaChevronLeft
              size='2.5rem'
              className='left-1 top-3 text-blue-600 absolute'
            />
          )}
          <HiPhotograph className='w-60 -mb-8 h-auto text-blue-600 filter drop-shadow-sm' />
          {!showRenameAlbum && (
            <div className='text-center my-auto w-52 truncate '>{name}</div>
          )}
          <AlbumManager
            isCreator={isCreator}
            albumId={albumId}
            name={name}
            showRenameAlbum={showRenameAlbum}
            toggleShowRenameAlbum={toggleShowRenameAlbum}
          />
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
