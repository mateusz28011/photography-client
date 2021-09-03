import Tile from './Tile';
import { useForm } from 'react-hook-form';
import Loading from '../Loading';
import { connect } from 'react-redux';
import { createAlbum, createAlbumClearError } from '../../actions/album';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../selectors';
import BackButton from './BackButton';

const CreateAlbumTile = ({
  toggleShowCreateAlbum,
  albumId,
  loading,
  error,
  createAlbum,
  createAlbumClearError,
}) => {
  const { register, handleSubmit } = useForm();

  const handleCreateAlbum = (formData) => {
    error && createAlbumClearError();
    createAlbum(formData, albumId);
  };

  return (
    <Tile>
      {loading ? (
        <Loading />
      ) : (
        <>
          <BackButton onClick={toggleShowCreateAlbum} />
          <form
            className='space-y-6 my-auto pt-6'
            onSubmit={handleSubmit(handleCreateAlbum)}
          >
            <div>
              <label htmlFor='Name' className='font-medium text-gray-700'>
                Name
              </label>
              <input type='text' required {...register('name')} />
            </div>
            <div className='flex items-center'>
              <label htmlFor='isPublic' className='font-medium text-gray-700'>
                Is public
              </label>
              <input type='checkbox' defaultChecked {...register('isPublic')} />
            </div>
            <input
              className='w-full btn-basic py-2'
              type='submit'
              value='Create album'
            />
          </form>
        </>
      )}
    </Tile>
  );
};

const loadingSelector = createLoadingSelector(['CREATE_ALBUM']);
const errorSelector = createErrorMessageSelector(['CREATE_ALBUM']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
});

export default connect(mapStateToProps, {
  createAlbum,
  createAlbumClearError,
})(CreateAlbumTile);
