import React, { useState } from 'react';
import Tile from './Tile';
import { HiPhotograph } from 'react-icons/hi';
import { connect } from 'react-redux';
import Loading from '../Loading';
import AlbumManager from './AlbumManager';
import BackButton from './BackButton';
import { AiOutlineLock } from 'react-icons/ai';

const AlbumTile = ({
  name,
  id: albumId,
  isPublic,
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
          {!showRenameAlbum && (
            <>
              {parent && <BackButton />}
              {!isPublic && (
                <AiOutlineLock className='my-auto text-blue-600 absolute right-1 top-2 w-8 h-8' />
              )}
              <HiPhotograph className='w-full h-auto text-blue-600 filter drop-shadow-sm' />
              <div className='text-center my-auto pb-3 w-full truncate'>
                {name}
              </div>
            </>
          )}
          {!parent && (
            <AlbumManager
              isCreator={isCreator}
              albumId={albumId}
              name={name}
              showRenameAlbum={showRenameAlbum}
              toggleShowRenameAlbum={toggleShowRenameAlbum}
            />
          )}
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
