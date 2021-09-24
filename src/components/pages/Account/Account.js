import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { editUser, editUserClearError } from '../../../actions/auth';
import {
  createErrorMessageSelector,
  createLoadingSelector,
} from '../../../selectors';
import ApiError from '../../ApiError';
import Loading from '../../Loading';
import Vendor from '../Vendor/Vendor';
import CreateVendorProfile from './CreateVendorProfile';

const Account = ({
  user,
  loading,
  error,
  loadingEditUser,
  errorEditUser,
  editUser,
  editUserClearError,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const { register, handleSubmit } = useForm();

  const toggleShowEdit = () => {
    setShowEdit((prev) => !prev);
  };

  const handleEdit = (data) => {
    console.log(data);
    editUser(data);
    toggleShowEdit();
    error && editUserClearError();
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <ApiError error={error} center />
  ) : user ? (
    <>
      <ApiError error={errorEditUser} clearFunc={editUserClearError} center />
      <div className='px-5 py-9 mt-3 mx-3 flex flex-col bg-white shadow rounded-lg md:px-10 md:w-2/3 md:mx-auto xl:w-1/2 xl:mx-auto font-medium relative'>
        {loadingEditUser && <Loading cover className='rounded-lg' />}
        <div className='text-2xl mb-8 font-bold self-center'>My account</div>
        <div>
          Email:
          <div className='ml-2 inline-block text-blue-600'>{user.email}</div>
        </div>
        <div>
          First name:
          <div className='ml-2 inline-block text-blue-600'>
            {showEdit ? (
              <input
                type='text'
                className='my-2'
                defaultValue={user.firstName}
                required
                {...register('firstName')}
              />
            ) : (
              user.firstName
            )}
          </div>
        </div>
        <div>
          Last name:
          <div className='ml-2 inline-block text-blue-600'>
            {showEdit ? (
              <input
                type='text'
                className='mb-2'
                defaultValue={user.lastName}
                required
                {...register('lastName')}
              />
            ) : (
              user.lastName
            )}
          </div>
        </div>
        <div>
          Join date:
          <div className='ml-2 inline-block text-blue-600'>
            {new Date(user.joinDate).toLocaleDateString()}
          </div>
        </div>
        <button
          className='btn-basic py-2 w-44 mt-4'
          type='button'
          onClick={showEdit ? handleSubmit(handleEdit) : toggleShowEdit}
        >
          {showEdit ? 'SUBMIT' : 'EDIT'}
        </button>
      </div>
      {user.isVendor ? (
        <Vendor profileId={user.profile} />
      ) : (
        <CreateVendorProfile />
      )}
    </>
  ) : null;
};
const loadingSelector = createLoadingSelector(['GET_USER']);
const errorSelector = createErrorMessageSelector(['GET_USER']);

const loadingEditUserSelector = createLoadingSelector(['EDIT_USER']);
const errorEditUserSelector = createErrorMessageSelector(['EDIT_USER']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  loadingEditUser: loadingEditUserSelector(state),
  errorEditUser: errorEditUserSelector(state),
  user: state.auth.user,
});

export default connect(mapStateToProps, { editUser, editUserClearError })(
  Account
);
