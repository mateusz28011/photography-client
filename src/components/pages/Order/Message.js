import React, { useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import {
  createNote,
  getNotes,
  createNoteClearError,
} from '../../../actions/notes';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import ApiError from '../../ApiError';
import Loading from '../../Loading';

const Message = ({
  loading,
  error,
  orderId,
  getNotes,
  createNote,
  createNoteClearError,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const isFormSent = useRef(false);

  const handleCreateNote = (formData) => {
    error && createNoteClearError();
    createNote(orderId, formData);
    isFormSent.current = true;
  };

  const successfulNoteCreation = useCallback(() => {
    if (isFormSent.current) {
      getNotes(orderId);
      reset();
      isFormSent.current = false;
    }
  }, [orderId, reset, getNotes]);

  useEffect(() => {
    loading === false && !error && successfulNoteCreation();
  }, [loading, error, successfulNoteCreation]);

  return (
    <>
      {error && (
        <ApiError error={error} clearFunc={createNoteClearError} center />
      )}
      <form
        className='bg-white shadow rounded-lg p-5 flex flex-col items-center'
        onSubmit={handleSubmit(handleCreateNote)}
      >
        <div className='w-full sm:w-1/2 lg:w-1/3'>
          <div className='font-medium text-blue-600 text-lg'>Send message:</div>
          <textarea className='w-full h-60' {...register('note')} required />
          <div className='h-16'>
            {loading ? (
              <Loading size={3.5} stroke={48} className='py-2' />
            ) : (
              <input
                className='w-full btn-basic py-2 mt-3'
                type='submit'
                value='Submit'
              ></input>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

const loadingSelector = createLoadingSelector(['CREATE_NOTE']);
const errorSelector = createErrorMessageSelector(['CREATE_NOTE']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
});

export default connect(mapStateToProps, {
  getNotes,
  createNote,
  createNoteClearError,
})(Message);
