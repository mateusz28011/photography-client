import React, { useState } from 'react';
import Tile from './Tile';
import PhotoManager from './PhotoManager';
import { connect } from 'react-redux';
import Loading from '../Loading';

const PhotoTile = ({
  id: imageId,
  thumbnailUrl,
  title,
  setShowPreview,
  index,
  isCreator,
  loadingDeleteImageFromAlbum,
  loadingRenameImageFromAlbum,
}) => {
  const [showRenameImage, setShowRenameImage] = useState(false);

  const toggleShowRenameImage = () => {
    setShowRenameImage((prev) => !prev);
  };

  const handleAlbumClick = () => {
    setShowPreview(index);
  };

  return (
    <Tile clickFunc={handleAlbumClick}>
      {(loadingDeleteImageFromAlbum &&
        loadingDeleteImageFromAlbum[String(imageId)]) ||
      (loadingRenameImageFromAlbum &&
        loadingRenameImageFromAlbum[String(imageId)]) ? (
        <Loading />
      ) : (
        <>
          <img
            src={thumbnailUrl}
            alt={title}
            className='rounded mx-auto shadow-sm mb-3'
          />
          {!showRenameImage && (
            <div className='text-center my-auto w-52 flex items-center justify-center'>
              <span className='truncate pr-1'>{title}</span>
            </div>
          )}
          <PhotoManager
            isCreator={isCreator}
            imageId={imageId}
            title={title}
            showRenameImage={showRenameImage}
            toggleShowRenameImage={toggleShowRenameImage}
          />
        </>
      )}
    </Tile>
  );
};

const mapStateToProps = (state) => ({
  loadingDeleteImageFromAlbum: state.loading?.DELETE_IMAGE_FROM_ALBUM,
  loadingRenameImageFromAlbum: state.loading?.RENAME_IMAGE_FROM_ALBUM,
});

export default connect(mapStateToProps)(PhotoTile);
