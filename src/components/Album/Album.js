import React, { useEffect, useState } from 'react';
import ApiError from '../ApiError';
import { v4 } from 'uuid';
import {
  getAlbum,
  uploadImageToAlbum,
  uploadImageToAlbumClearError,
  createAlbumClearError,
} from '../../actions/album';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../selectors';
import { connect } from 'react-redux';
import PhotoTile from './PhotoTile';
import AlbumTile from './AlbumTile';
import CreatorTile from './CreatorTile';
import Preview from './Preview';

const Album = ({
  albumId: rootAlbumId,
  user,
  loading,
  error,
  data,
  getAlbum,
  uploadImageToAlbumClearError,
  createAlbumClearError,
}) => {
  const { images, childAlbums } = data || {};
  const { id: creatorId } = data?.creator || {};
  const parentAlbum = data?.parentAlbum || null;
  const [isCreator, setIsCreator] = useState(false);
  const [albumId, setAlbumId] = useState(rootAlbumId);
  const [showPreview, setShowPreview] = useState(false);
  console.log('showpreview', showPreview);
  useEffect(() => {
    console.log('fetch album');
    getAlbum(albumId);
  }, [getAlbum, albumId]);

  useEffect(() => {
    if (user && creatorId)
      user?.id === creatorId ? setIsCreator(true) : setIsCreator(false);
  }, [user, creatorId]);

  return (
    <>
      {loading.getAlbum ? (
        <p>loading</p>
      ) : error.getAlbum ? (
        <ApiError error={error.getAlbum} />
      ) : (
        data && (
          <>
            {error.uploadImageToAlbum && (
              <ApiError
                error={error.uploadImageToAlbum}
                center
                clearFunc={uploadImageToAlbumClearError}
              />
            )}
            {error.createAlbum && (
              <ApiError
                error={error.createAlbum}
                center
                clearFunc={createAlbumClearError}
              />
            )}
            {(showPreview || showPreview === 0) && (
              <Preview
                images={images}
                imageIndex={showPreview}
                setShowPreview={setShowPreview}
              />
            )}
            <div className='flex flex-wrap justify-around gap-3 p-3 2xl:justify-between 2xl:px-0'>
              <CreatorTile isCreator={isCreator} albumId={albumId} />
              {parentAlbum && (
                <AlbumTile
                  {...parentAlbum}
                  parent
                  setAlbumId={setAlbumId}
                  key={v4()}
                />
              )}
              {childAlbums &&
                childAlbums.map((album) => {
                  return (
                    <AlbumTile {...album} setAlbumId={setAlbumId} key={v4()} />
                  );
                })}
              {images &&
                images.map((image, index) => {
                  return (
                    <PhotoTile
                      {...image}
                      index={index}
                      setShowPreview={setShowPreview}
                      key={v4()}
                    />
                  );
                })}
            </div>
          </>
        )
      )}
    </>
  );
};

const loadingSelector = createLoadingSelector(['GET_ALBUM']);
const errorSelector = createErrorMessageSelector(['GET_ALBUM']);

const loadingSelectorUploadImageToAlbum = createLoadingSelector([
  'UPLOAD_IMAGE_TO_ALBUM',
]);
const errorSelectorUploadImageToAlbum = createErrorMessageSelector([
  'UPLOAD_IMAGE_TO_ALBUM',
]);
const errorSelectorCreateAlbum = createErrorMessageSelector(['CREATE_ALBUM']);

const mapStateToProps = (state) => ({
  loading: {
    getAlbum: loadingSelector(state),
    uploadImageToAlbum: loadingSelectorUploadImageToAlbum(state),
  },
  error: {
    getAlbum: errorSelector(state),
    uploadImageToAlbum: errorSelectorUploadImageToAlbum(state),
    createAlbum: errorSelectorCreateAlbum(state),
  },
  data: state.album.data,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getAlbum,
  uploadImageToAlbum,
  uploadImageToAlbumClearError,
  createAlbumClearError,
})(Album);
