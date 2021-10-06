import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import {
  createVendorProfile,
  createVendorProfileClearError,
} from '../../../actions/vendor';
import {
  createErrorMessageSelector,
  createLoadingSelector,
} from '../../../selectors';
import Loading from '../../Loading';
import ApiError from '../../ApiError';
import { getUser } from '../../../actions/auth';
import { motion } from 'framer-motion';
import pageAnimation from '../pageAnimation';

const CreateVendorProfile = ({
  user,
  vendorProfile,
  loading,
  error,
  createVendorProfile,
  createVendorProfileClearError,
  getUser,
}) => {
  const { register, handleSubmit } = useForm();
  const avatarRef = useRef();
  const avatar = register('avatar');
  const [fileName, setFileName] = useState();

  const handleCreateProfile = (formData) => {
    console.log(formData);
    if (formData.avatar) {
      formData.avatar = formData.avatar[0];
      if (formData.avatar === undefined) {
        delete formData.avatar;
      }
    }
    console.log(formData);
    error && createVendorProfileClearError();
    createVendorProfile(formData);
  };

  useEffect(() => {
    if (user?.isVendor === false && vendorProfile?.owner?.id === user?.id)
      getUser();
  }, [vendorProfile, user, getUser]);

  return (
    <motion.div
      className='px-5 py-9 mt-3 mx-3 flex flex-col bg-white shadow rounded-lg md:px-10 md:w-2/3 md:mx-auto xl:w-1/2 xl:mx-auto relative'
      {...pageAnimation}
    >
      {loading && <Loading className='rounded-lg' cover />}
      {error && (
        <ApiError
          error={error}
          clearFunc={createVendorProfileClearError}
          center
        />
      )}
      <span className='text-lg '>
        If you want to become a vendor and start offering photography services
        all you need to do is create your vendor profile.
      </span>
      <form
        className='space-y-6 my-auto pt-6'
        onSubmit={handleSubmit(handleCreateProfile)}
      >
        <div className=''>
          <label htmlFor='avatar' className='font-medium text-gray-700'>
            Avatar
          </label>
          <div
            onClick={() => avatarRef.current.click()}
            className='w-40 mt-0.5 text-center font-medium text-lg text-blue-600 rounded border-2 border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition duration-100'
          >
            Upload an avatar
          </div>
          <div className='mt-1 text-blue-600 font-medium'>{fileName}</div>

          <input
            type='file'
            accept='image/png, image/jpeg'
            className='hidden'
            {...avatar}
            onChange={(e) => {
              avatar.onChange(e);
              setFileName(e.target.files[0].name);
            }}
            ref={(e) => {
              avatar.ref(e);
              avatarRef.current = e;
            }}
          />
        </div>
        <div>
          <label htmlFor='name' className='font-medium text-gray-700'>
            Name <span className='text-red-600'>*</span>
          </label>
          <input type='text' required {...register('name')} />
        </div>
        <div>
          <label htmlFor='description' className='font-medium text-gray-700'>
            Description <span className='text-red-600'>*</span>
          </label>
          <TextareaAutosize
            placeholder='You can write here about yourself and what kinds of services you offer.'
            minRows={7}
            required
            {...register('description')}
          />
        </div>
        <div>
          <label htmlFor='paymentInfo' className='font-medium text-gray-700'>
            Payment info
          </label>
          <TextareaAutosize
            placeholder='Describe the methods by which you will receive payments for services. You can change it any time and leave it empty for now.'
            minRows={7}
            {...register('paymentInfo')}
          />
        </div>
        <input
          className='w-full btn-basic py-2'
          type='submit'
          value='Create Profile'
        />
      </form>
    </motion.div>
  );
};

const loadingSelector = createLoadingSelector(['CREATE_VENDOR_PROFILE']);
const errorSelector = createErrorMessageSelector(['CREATE_VENDOR_PROFILE']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  user: state.auth.user,
  vendorProfile: state.vendor.data,
});

export default connect(mapStateToProps, {
  createVendorProfile,
  createVendorProfileClearError,
  getUser,
})(CreateVendorProfile);
