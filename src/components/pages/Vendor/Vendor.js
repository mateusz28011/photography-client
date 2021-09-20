import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getVendor,
  editVendor,
  editVendorClearError,
} from '../../../actions/vendor';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import ApiError from '../../ApiError';
import Album from '../../Album/Album';
import Loading from '../../Loading';
import MakeOrder from './MakeOrder';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineCloudUpload } from 'react-icons/ai';
const Vendor = ({
  user,
  loading,
  error,
  data,
  getVendor,
  editVendor,
  editVendorClearError,
  loadingEditVendor,
  errorEditVendor,
  profileId,
}) => {
  const params = useParams();
  profileId = profileId || params.profileId;
  const { portfolio, name, avatar, description, paymentInfo } = data || {};
  const { email, id: ownerId, firstName, lastName } = data?.owner || {};
  const [isOwner, setIsOwner] = useState(false);
  const [showMakeOrder, setShowMakeOrder] = useState(false);
  const history = useHistory();
  const [showEdit, setShowEdit] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const uploadedAvatar = watch('avatar');
  const [previewAvatar, setPreviewAvatar] = useState();

  const toggleShowEdit = () => {
    setShowEdit((prev) => !prev);
  };

  const handleEdit = (data) => {
    if (data.avatar) {
      data.avatar = data.avatar[0];
    }
    editVendor(profileId, data);
    toggleShowEdit();
    error && editVendorClearError();
    previewAvatar && setPreviewAvatar(undefined);
  };

  const toggleShowMakeOrder = () => {
    setShowMakeOrder((prev) => !prev);
  };

  const redirectToLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    console.log('fetch vendor');
    getVendor(profileId);
  }, [getVendor, profileId]);

  useEffect(() => {
    user?.id === ownerId ? setIsOwner(true) : setIsOwner(false);
  }, [user, ownerId]);

  useEffect(() => {
    if (uploadedAvatar && uploadedAvatar.length !== 0) {
      setPreviewAvatar(URL.createObjectURL(uploadedAvatar[0]));
    }
  }, [uploadedAvatar]);

  return loading ? (
    <Loading className='py-32' />
  ) : error ? (
    <ApiError error={error} center />
  ) : data ? (
    <>
      <div className='px-5 py-9 mt-3 mx-3 flex flex-col bg-white shadow rounded-lg items-center md:px-10 md:w-2/3 md:mx-auto xl:w-1/2 xl:mx-auto '>
        <ApiError
          error={errorEditVendor}
          clearFunc={editVendorClearError}
          center
        />
        {loadingEditVendor ? (
          <Loading className='py-16' />
        ) : (
          <>
            <div className='text-xl font-semibold text-center'>
              {showEdit ? (
                <input
                  type='text'
                  defaultValue={name}
                  required
                  {...register('name')}
                />
              ) : (
                name
              )}
            </div>

            <label className='relative mt-6 mb-8'>
              <img
                src={previewAvatar ? previewAvatar : avatar}
                alt={`${name}'s avatar`}
                className='shadow rounded h-64'
              />
              {showEdit && (
                <>
                  <div className='absolute flex text-blue-600 top-0 bg-gray-100 bg-opacity-70 w-full h-full'>
                    <AiOutlineCloudUpload size='8rem' className='m-auto' />
                  </div>
                  <input
                    type='file'
                    accept='image/png, image/jpeg'
                    className='hidden'
                    {...register('avatar')}
                  />
                </>
              )}
            </label>

            <div className='self-start text-blue-600 text-lg font-medium mb-5'>
              <div className=''>{`${firstName} ${lastName}`}</div>
              <div className='text-sm'>{email}</div>
            </div>
            <div className='w-full '>
              {isOwner && (
                <div className='self-start mt-4 font-medium'>Description:</div>
              )}
              {showEdit ? (
                <TextareaAutosize
                  className=''
                  defaultValue={description}
                  required
                  {...register('description')}
                />
              ) : (
                description
              )}
            </div>
            {showMakeOrder && (
              <MakeOrder vendorId={ownerId} history={history} />
            )}
            {!isOwner && !showMakeOrder && (
              <button
                onClick={user ? toggleShowMakeOrder : redirectToLogin}
                className={
                  'btn-basic py-2 w-full mt-6' + (user ? '' : ' opacity-60')
                }
              >
                {user ? 'Make Order' : 'Sign in to make order'}
              </button>
            )}
            {isOwner && (
              <>
                <div className='self-start mt-4 font-medium'>Payment info:</div>
                {showEdit ? (
                  <TextareaAutosize
                    defaultValue={paymentInfo}
                    required
                    {...register('paymentInfo')}
                  />
                ) : (
                  <div className='self-start'>{paymentInfo}</div>
                )}
                <button
                  className='self-start btn-basic py-2 w-44 mt-4'
                  type='button'
                  onClick={showEdit ? handleSubmit(handleEdit) : toggleShowEdit}
                >
                  {showEdit ? 'SUBMIT' : 'EDIT'}
                </button>
              </>
            )}
          </>
        )}
      </div>
      <div className='bg-white shadow rounded-lg text-center py-3 mt-3 font-medium text-xl text-gray-600'>
        PORTFOLIO
      </div>
      <Album albumId={portfolio} isPortfolio />
    </>
  ) : null;
};

const loadingSelector = createLoadingSelector(['GET_VENDOR']);
const errorSelector = createErrorMessageSelector(['GET_VENDOR']);

const loadingEditVendorSelector = createLoadingSelector(['EDIT_VENDOR']);
const errorEditVendorSelector = createErrorMessageSelector(['EDIT_VENDOR']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  loadingEditVendor: loadingEditVendorSelector(state),
  errorEditVendor: errorEditVendorSelector(state),
  data: state.vendor.data,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getVendor,
  editVendor,
  editVendorClearError,
})(Vendor);
