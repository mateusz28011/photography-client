import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import {
  searchCreateAlbum,
  searchCreateAlbumClearError,
} from '../../../actions/search';
import { createLoadingSelector } from '../../../selectors';
import Tile from '../../Album/Tile';
import Loading from '../../Loading';
import BackButton from '../../Album/BackButton';
import React, { useState } from 'react';

const CreateAlbumTile = ({
  toggleShowCreateAlbum,
  loading,
  error,
  searchCreateAlbum,
  searchCreateAlbumClearError,
}) => {
  const { register, handleSubmit } = useForm();

  const handleCreateAlbum = (formData) => {
    error && searchCreateAlbumClearError();
    searchCreateAlbum(formData);
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

const loadingSelector = createLoadingSelector(['SEARCH_CREATE_ALBUM']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
});

export default connect(mapStateToProps, {
  searchCreateAlbum,
  searchCreateAlbumClearError,
})(CreateAlbumTile);
