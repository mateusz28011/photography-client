import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AlbumManager from './AlbumManager';
import Loading from '../Loading';
import { createErrorMessageSelector } from '../../selectors';

const CurrentAlbumInfo = ({
  name,
  returnToMyAlbums,
  isCreator,
  albumId,
  showRenameAlbum,
  toggleShowRenameAlbum,
  loadingDeleteAlbum,
  loadingRenameAlbum,
  error,
}) => {
  useEffect(() => {
    !error &&
      loadingDeleteAlbum &&
      loadingDeleteAlbum[String(albumId)] === false &&
      returnToMyAlbums();
  }, [error, loadingDeleteAlbum, albumId, returnToMyAlbums]);

  return (
    <>
      {(loadingDeleteAlbum && loadingDeleteAlbum[String(albumId)]) ||
      (loadingRenameAlbum && loadingRenameAlbum[String(albumId)]) ? (
        <Loading className='py-32' />
      ) : (
        name &&
        returnToMyAlbums && (
          <div className='bg-white shadow rounded-lg text-center py-3 mt-3 font-base text-lg text-gray-600'>
            Current album:
            <div className='inline-block font-medium text-xl ml-2 text-blue-600'>
              {name}
            </div>
            <div
              className={
                'w-52 mx-auto flex flex-col items-center justify-center' +
                (showRenameAlbum ? ' mt-3' : '')
              }
            >
              <AlbumManager
                isCreator={isCreator}
                albumId={albumId}
                name={name}
                showRenameAlbum={showRenameAlbum}
                toggleShowRenameAlbum={toggleShowRenameAlbum}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

const errorSelector = createErrorMessageSelector(['DELETE_ALBUM']);

const mapStateToProps = (state) => ({
  loadingDeleteAlbum: state.loading?.DELETE_ALBUM,
  loadingRenameAlbum: state.loading?.RENAME_ALBUM,
  error: errorSelector(state),
});

export default connect(mapStateToProps)(CurrentAlbumInfo);
