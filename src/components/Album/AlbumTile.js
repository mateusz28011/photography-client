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
  handleSetAlbumId,
  parent,
  isCreator,
  loadingDeleteAlbum,
  loadingEditAlbum,
}) => {
  const [showEditAlbum, setShowEditAlbum] = useState(false);

  const toggleShowEditAlbum = () => {
    setShowEditAlbum((prev) => !prev);
  };

  const handleAlbumClick = () => {
    handleSetAlbumId(albumId);
  };

  return (
    <Tile clickFunc={!showEditAlbum ? handleAlbumClick : undefined}>
      {(loadingDeleteAlbum && loadingDeleteAlbum[String(albumId)]) ||
      (loadingEditAlbum && loadingEditAlbum[String(albumId)]) ? (
        <Loading />
      ) : (
        <>
          {!showEditAlbum && (
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
              isPublic={isPublic}
              showEditAlbum={showEditAlbum}
              toggleShowEditAlbum={toggleShowEditAlbum}
            />
          )}
        </>
      )}
    </Tile>
  );
};

const mapStateToProps = (state) => ({
  loadingDeleteAlbum: state.loading?.DELETE_ALBUM,
  loadingEditAlbum: state.loading?.EDIT_ALBUM,
});

export default connect(mapStateToProps)(AlbumTile);
