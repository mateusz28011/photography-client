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
import pageAnimation from '../pageAnimation';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

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
  const [sentEditRequest, setSentEditRequest] = useState(false);
  const controls = useAnimation();
  const controlsTextArea = useAnimation();

  const toggleShowEdit = () => {
    setShowEdit((prev) => !prev);
  };

  const handleEdit = (data) => {
    if (data.avatar) {
      data.avatar = data.avatar[0];
    }
    editVendor(profileId, data);
    setSentEditRequest(true);
    error && editVendorClearError();
    previewAvatar && setPreviewAvatar(undefined);
  };

  useEffect(() => {
    if (sentEditRequest === true && loadingEditVendor === false) {
      setSentEditRequest(true);
      toggleShowEdit();
    }
  }, [sentEditRequest, loadingEditVendor]);

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

  const animateMakeOrder = () => {
    showMakeOrder &&
      controls.start({
        x: 0,
        opacity: 1,
      });
  };

  const animateTextArea = () => {
    controlsTextArea.start({
      x: 0,
      opacity: 1,
    });
  };

  return loading ? (
    <Loading className='py-32' />
  ) : error ? (
    <ApiError error={error} center />
  ) : data ? (
    <>
      <motion.div
        layout
        onLayoutAnimationComplete={() => {
          animateMakeOrder();
          animateTextArea();
        }}
        className='px-5 py-9 mt-3 mx-3 flex flex-col bg-white shadow rounded-lg items-center md:px-10 md:w-2/3 md:mx-auto xl:w-1/2 xl:mx-auto relative'
        {...pageAnimation}
      >
        <ApiError
          error={errorEditVendor}
          clearFunc={editVendorClearError}
          center
        />
        {loadingEditVendor && <Loading className='rounded-lg z-20' cover />}

        <motion.div layout className='text-xl font-semibold text-center'>
          {showEdit ? (
            <motion.input
              layoutId='nameAccount'
              type='text'
              defaultValue={name}
              required
              {...register('name')}
            />
          ) : (
            <motion.div layout='position' layoutId='nameAccount'>
              {name}
            </motion.div>
          )}
        </motion.div>

        <motion.label layout='position' className='relative mt-6 mb-8'>
          <motion.img
            layout
            src={previewAvatar ? previewAvatar : avatar}
            alt={`${name}'s avatar`}
            className='shadow rounded h-64'
          />
          {showEdit && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                className='absolute flex cursor-pointer text-blue-600 top-0 bg-gray-100 bg-opacity-70 w-full h-full'
              >
                <AiOutlineCloudUpload size='8rem' className='m-auto' />
              </motion.div>
              <input
                type='file'
                accept='image/png, image/jpeg'
                className='hidden'
                {...register('avatar')}
              />
            </>
          )}
        </motion.label>

        <motion.div
          layout
          className='self-start text-blue-600 text-lg font-medium mb-5'
        >
          <motion.div
            layout
            className=''
          >{`${firstName} ${lastName}`}</motion.div>
          <motion.div layout className='text-sm'>
            {email}
          </motion.div>
        </motion.div>
        <motion.div layout className='w-full '>
          {isOwner && (
            <motion.div
              layout='position'
              className='self-start mt-4 font-medium'
            >
              Description:
            </motion.div>
          )}
          <AnimatePresence exitBeforeEnter>
            {showEdit && (
              <motion.div
                layout
                key='descriptionAccountTextArea'
                initial={{ x: '-50px', opacity: 0 }}
                animate={controlsTextArea}
                exit={{ x: '50px', opacity: 0 }}
              >
                <TextareaAutosize
                  defaultValue={description}
                  required
                  {...register('description')}
                />
              </motion.div>
            )}
            {!showEdit && (
              <motion.div
                layout
                className='break-all'
                key='descriptionAccount'
                initial={{ x: '-50px', opacity: 0 }}
                animate={controlsTextArea}
                exit={{ x: '50px', opacity: 0 }}
              >
                {description}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {showMakeOrder && (
          <MakeOrder vendorId={ownerId} history={history} controls={controls} />
        )}
        {!isOwner && !showMakeOrder && (
          <motion.button
            layout
            onClick={user ? toggleShowMakeOrder : redirectToLogin}
            className={
              'btn-basic py-2 w-full mt-6' + (user ? '' : ' opacity-60')
            }
          >
            {user ? 'Make Order' : 'Sign in to make order'}
          </motion.button>
        )}

        <motion.div layout className='w-full'>
          {isOwner && (
            <>
              <motion.div
                layout='position'
                className='self-start mt-4 font-medium'
              >
                Payment info:
              </motion.div>
              <AnimatePresence exitBeforeEnter>
                {showEdit ? (
                  <motion.div
                    layout
                    className='w-full'
                    key='paymentInfoAccountTextArea'
                    initial={{ x: '-50px', opacity: 0 }}
                    animate={controlsTextArea}
                    exit={{ x: '50px', opacity: 0 }}
                  >
                    <TextareaAutosize
                      defaultValue={paymentInfo}
                      required
                      {...register('paymentInfo')}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    layout
                    className='self-start break-all'
                    key='paymentInfoAccount'
                    initial={{ x: '-50px', opacity: 0 }}
                    animate={controlsTextArea}
                    exit={{ x: '50px', opacity: 0 }}
                  >
                    {paymentInfo ? paymentInfo : 'Empty'}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                layout
                className='flex w-full justify-start flex-wrap items-center gap-2 mt-3'
              >
                <button
                  className='btn-basic w-44 py-1.5 px-7'
                  type='button'
                  onClick={showEdit ? handleSubmit(handleEdit) : toggleShowEdit}
                >
                  {showEdit ? 'Confirm' : 'Edit'}
                </button>
                {showEdit && (
                  <input
                    type='button'
                    value='Close'
                    onClick={toggleShowEdit}
                    className='btn-basic w-44 py-1.5 px-7'
                  />
                )}
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        layout
        className='bg-white shadow rounded-lg text-center py-3 mt-3 font-medium text-xl text-gray-600'
        {...pageAnimation}
      >
        PORTFOLIO
      </motion.div>
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
