import { useState } from 'react';
import Tile from './Tile';
import CreateAlbumTile from './CreateAlbumTile';
import { connect } from 'react-redux';
import {
  uploadImageToAlbum,
  uploadImageToAlbumClearError,
} from '../../actions/album';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../selectors';
import Loading from '../Loading';

const CreatorTile = ({
  isCreator,
  albumId,
  loading,
  error,
  uploadImageToAlbum,
  uploadImageToAlbumClearError,
}) => {
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);

  const toggleShowCreateAlbum = () => {
    setShowCreateAlbum((prev) => !prev);
  };

  const handleImageUpload = (e) => {
    error && uploadImageToAlbumClearError();
    uploadImageToAlbum(albumId, e.target.files[0]);
  };

  return isCreator ? (
    showCreateAlbum ? (
      <CreateAlbumTile
        toggleShowCreateAlbum={toggleShowCreateAlbum}
        albumId={albumId}
      />
    ) : (
      <Tile>
        <div className='flex flex-col h-full w-11/12 items-center justify-center divide-y divide-blue-600 '>
          <div className='h-1/2 flex flex-col justify-center items-center w-full'>
            {loading ? (
              <Loading />
            ) : (
              <label className='h-3/4 w-10/12 flex items-center justify-center btn-border'>
                <span className='text-center text-sm px-1 ssm:text-base sm:text-lg'>
                  Upload an image
                </span>
                <input
                  type='file'
                  accept='image/png, image/jpeg'
                  className='hidden'
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
          <div className='h-1/2 flex w-11/12 justify-center items-center'>
            <button
              onClick={toggleShowCreateAlbum}
              className='h-3/4 w-11/12 flex items-center justify-center btn-border text-sm px-1 ssm:text-base sm:text-lg'
            >
              Create an album
            </button>
          </div>
        </div>
      </Tile>
    )
  ) : null;
};

const loadingSelector = createLoadingSelector(['UPLOAD_IMAGE_TO_ALBUM']);
const errorSelector = createErrorMessageSelector(['UPLOAD_IMAGE_TO_ALBUM']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
});

export default connect(mapStateToProps, {
  uploadImageToAlbum,
  uploadImageToAlbumClearError,
})(CreatorTile);
