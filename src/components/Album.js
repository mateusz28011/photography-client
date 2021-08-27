import React, { useEffect, useState } from 'react';
import ApiError from './ApiError';
import { v4 } from 'uuid';
import { getAlbum, uploadImageToAlbum } from '../actions/album';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../selectors';
import { connect } from 'react-redux';

const Album = ({
  albumId,
  user,
  loading,
  error,
  loadingImage,
  errorImage,
  data,
  getAlbum,
  uploadImageToAlbum,
}) => {
  const { images, childAlbums } = data || {};
  const { id: creatorId } = data?.creator || {};
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    console.log('fetch album');
    getAlbum(albumId);
  }, [getAlbum, albumId]);

  useEffect(() => {
    user?.id === creatorId ? setIsCreator(true) : setIsCreator(false);
  }, [user, creatorId]);

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : error ? (
        <ApiError error={error} />
      ) : (
        data && (
          <div className='flex flex-wrap justify-around gap-3 p-3 2xl:justify-between 2xl:px-0'>
            {isCreator && (
              <Tile>
                <div className='flex flex-col h-full items-center justify-center divide-y divide-blue-600'>
                  <div className='h-1/2 flex flex-col w-11/12 justify-center items-center'>
                    {errorImage && <ApiError error={errorImage} />}
                    {loadingImage ? (
                      <p>loading</p>
                    ) : (
                      <label className='btn-basic py-2 px-4'>
                        <span>Upload a file</span>
                        <input
                          type='file'
                          accept='image/png, image/jpeg'
                          className='hidden'
                          onChange={(e) =>
                            uploadImageToAlbum(albumId, e.target.files[0])
                          }
                        />
                      </label>
                    )}
                  </div>
                  <div className='h-1/2 flex w-11/12 justify-center items-center'>
                    <button className='btn-basic py-2 px-4'>
                      Create an album
                    </button>
                  </div>
                </div>
              </Tile>
            )}
            {images &&
              images.map((image) => {
                return <PhotoTile {...image} key={v4()} />;
              })}
          </div>
        )
      )}
    </>
  );
};

const Tile = ({ children }) => {
  return <div className='bg-white p-3 shadow rounded-lg w-80'>{children}</div>;
};

const PhotoTile = ({ thumbnailUrl, url, title }) => {
  return (
    <Tile>
      <img src={thumbnailUrl} alt={title} className='rounded mx-auto' />
      <div className='text-center mx-auto w-52 truncate '>{title}</div>
    </Tile>
  );
};

const loadingSelector = createLoadingSelector(['GET_ALBUM']);
const errorSelector = createErrorMessageSelector(['GET_ALBUM']);

const loadingSelectorImage = createLoadingSelector(['UPLOAD_IMAGE_TO_ALBUM']);
const errorSelectorImage = createErrorMessageSelector([
  'UPLOAD_IMAGE_TO_ALBUM',
]);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  loadingImage: loadingSelectorImage(state),
  errorImage: errorSelectorImage(state),
  data: state.album.data,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getAlbum, uploadImageToAlbum })(
  Album
);
