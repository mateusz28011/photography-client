import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVendor } from '../../../actions/vendor';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import ApiError from '../../ApiError';
import Album from '../../Album/Album';
import Loading from '../../Loading';

const Vendor = ({ user, loading, error, data, getVendor }) => {
  const { vendorid } = useParams();
  const { portfolio, name, avatar, description } = data || {};
  const { email, id: ownerId, firstName, lastName } = data?.owner || {};
  const [isOwner, setIsOwner] = useState(false);

  const history = useHistory();

  const redirectToLogin = () => {
    history.push('/login');
  };

  const redirectToMakeOrder = () => {
    history.push(`/vendor/${vendorid}/makeorder`);
  };

  useEffect(() => {
    console.log('fetch vendor');
    getVendor(vendorid);
  }, [getVendor, vendorid]);

  useEffect(() => {
    user?.id === ownerId ? setIsOwner(true) : setIsOwner(false);
  }, [user, ownerId]);

  return loading ? (
    <Loading />
  ) : error ? (
    <ApiError error={error} />
  ) : data ? (
    <>
      <div className='px-5 py-9 mt-3 mx-3 flex flex-col bg-white shadow rounded-lg items-center md:px-10 md:w-2/3 md:mx-auto xl:w-1/2 xl:mx-auto '>
        <div className='text-xl font-semibold text-center'>{name}</div>
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className='shadow rounded mt-6 mb-8'
        />
        <div className='self-start text-blue-600 text-lg font-medium mb-5'>
          <div className=''>{`${firstName} ${lastName}`}</div>
          <div className='text-sm'>{email}</div>
        </div>
        <div className=''>{description}</div>
        {!isOwner && (
          <button
            onClick={user ? redirectToMakeOrder : redirectToLogin}
            className={
              'btn-basic py-2 w-full mt-6' + (user ? '' : ' opacity-60')
            }
          >
            {user ? 'Make Order' : 'Sign in to make order'}
          </button>
        )}
      </div>
      <div className='bg-white shadow rounded-lg text-center py-3 mt-3 font-medium text-xl text-gray-600'>
        PORTFOLIO
      </div>
      <Album albumId={portfolio} />
    </>
  ) : null;
};

const loadingSelector = createLoadingSelector(['GET_VENDOR']);
const errorSelector = createErrorMessageSelector(['GET_VENDOR']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  data: state.vendor.data,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getVendor })(Vendor);
