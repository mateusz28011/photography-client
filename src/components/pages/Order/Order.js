import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import {
  getOrder,
  updateOrderStatusClearError,
  updateOrderCostClearError,
} from '../../../actions/order';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import ApiError from '../../ApiError';
import Loading from '../../Loading';
import pageAnimation from '../pageAnimation';
import Cost from './Cost';
import Notes from './Notes';
import Status from './Status';
import OrderAlbum from './OrderAlbum';

const Order = ({
  loading,
  error,
  errorUpdateOrderStatus,
  errorUpdateOrderCost,
  data,
  user,
  getOrder,
}) => {
  const { orderId } = useParams();
  const isVendor = data && user && user.id === data.vendor.id;

  useEffect(() => {
    orderId && getOrder(orderId);
  }, [orderId, getOrder]);

  return loading ? (
    <Loading className='py-32' />
  ) : error ? (
    <ApiError error={error} center />
  ) : data ? (
    <motion.div layout='position' className='space-y-3' {...pageAnimation}>
      <motion.div layout className='bg-white shadow rounded-b-lg p-5 relative'>
        {errorUpdateOrderStatus && (
          <ApiError
            error={errorUpdateOrderStatus}
            center
            clearFunc={updateOrderStatusClearError}
          />
        )}
        {errorUpdateOrderCost && (
          <ApiError
            error={errorUpdateOrderCost}
            center
            clearFunc={updateOrderCostClearError}
          />
        )}
        <motion.div layout className='text-xl text-center'>
          Order number:
          <div className='ml-2 inline-block font-medium text-blue-600'>
            {data.id}
          </div>
        </motion.div>
        <Status
          orderId={orderId}
          isVendor={isVendor}
          status={data.status}
          statusDisplay={data.statusDisplay}
        />
        <motion.div layout className='font-medium mt-2.5'>
          Order date:
          <div className='ml-2 inline-block font-normal text-blue-600'>
            {new Date(data.created).toLocaleString()}
          </div>
        </motion.div>
        <motion.div layout className='font-medium flex '>
          {isVendor ? 'Client:' : 'Vendor:'}
          <div className='ml-2 inline-block font-normal text-blue-600'>
            {!isVendor && (
              <div className='font-medium '>{data.profileName}</div>
            )}
            {isVendor ? (
              `${data.client.firstName} ${data.client.lastName}`
            ) : (
              <div className='text-sm'>{`${data.vendor.firstName} ${data.vendor.lastName}`}</div>
            )}
          </div>
        </motion.div>
        <motion.div layout className='font-medium'>
          Email:
          <div className='ml-2 inline-block font-normal text-blue-600'>
            {isVendor ? data.client.email : data.vendor.email}
          </div>
        </motion.div>
        <motion.div layout className='space-y-2'>
          <motion.div layout>
            <div className='font-medium mt-2 break-all'>Description:</div>
            <div className='bg-gray-100 py-1 px-3 rounded-lg mt-1'>
              {data.description}
            </div>
          </motion.div>
          <Cost
            orderId={orderId}
            isVendor={isVendor}
            status={data.status}
            cost={data.cost}
            currency={data.currency}
          />
          {data.status === 4 && !isVendor && (
            <motion.div layout>
              <div className='font-medium'>Payment info:</div>
              <div className='bg-gray-100 py-1 px-3 rounded-lg mt-1'>
                {data.paymentInfo}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      <Notes orderId={orderId} isVendor={isVendor} />
      <OrderAlbum albumId={data.album} isVendor={isVendor} />
    </motion.div>
  ) : null;
};

const loadingSelector = createLoadingSelector(['GET_ORDER']);
const errorSelector = createErrorMessageSelector(['GET_ORDER']);

const errorUpdateOrderStatusSelector = createErrorMessageSelector([
  'UPDATE_ORDER_STATUS',
]);
const errorUpdateOrderCostSelector = createErrorMessageSelector([
  'UPDATE_ORDER_COST',
]);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  errorUpdateOrderStatus: errorUpdateOrderStatusSelector(state),
  errorUpdateOrderCost: errorUpdateOrderCostSelector(state),
  data: state.order.data,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getOrder,
  updateOrderCostClearError,
  updateOrderStatusClearError,
})(Order);
