import React, { useEffect, useState } from 'react';
import ApiError from '../../ApiError';
import { searchOrders } from '../../../actions/search';
import { connect } from 'react-redux';
import Loading from '../../Loading';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import NavigationNextPrevious from '../Search/NavigationNextPrevious';
import OrdersPanel from './OrdersPanel';
import { useLocation, useHistory } from 'react-router-dom';

const Orders = ({ loading, error, data, user, searchOrders }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const orders = data?.results;

  useEffect(() => {
    console.log('fetch my orders');
    searchOrders(location.search);
    dataLoaded === false && setDataLoaded(true);
  }, [searchOrders, location, dataLoaded]);

  const goToOrder = (orderId) => {
    history.push(`/order/${orderId}`);
  };

  const isVendor = (order) => order.vendor.id === user.id;

  const isClient = (order) => order.client.id === user.id;

  return (
    <>
      <OrdersPanel location={location} history={history} />
      {loading ? (
        <Loading className='py-32' />
      ) : error ? (
        <ApiError center error={error} />
      ) : dataLoaded ? (
        orders && orders?.length !== 0 ? (
          <>
            <div className='bg-whiterounded-lgshadow py-4 sm:px-4 2xl:px-0 overflow-x-scroll ssm:overflow-x-hidden'>
              <table className='table-auto bg-white w-full text-center text-base shadow'>
                <thead>
                  <tr className='bg-blue-600 text-base md:text-lg text-white'>
                    <th className='py-1 pl-2.5 md:pl-0'>Vendor</th>
                    <th className='pl-2.5 md:pl-0'>Client</th>
                    <th className='pl-2.5 md:pl-0'>Cost</th>
                    <th className='pl-2.5 md:pl-0'>Order date</th>
                    <th className='pl-2.5 md:pl-0'>Status</th>
                    <th className='pl-2.5 md:pl-0 pr-2.5 md:pr-0'></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-solid divide-blue-200'>
                  {orders.map((order, index) => (
                    <tr key={index} className=''>
                      <td
                        className={
                          'py-1 pl-2.5 md:pl-0' +
                          (isVendor(order) ? ' text-blue-600 font-medium' : '')
                        }
                      >
                        {isVendor(order) ? 'Me' : order.profileName}
                      </td>
                      <td
                        className={
                          'pl-2.5 md:pl-0' +
                          (isClient(order) ? ' text-blue-600 font-medium' : '')
                        }
                      >
                        {isClient(order)
                          ? 'Me'
                          : `${order.client.firstName} ${order.client.lastName}`}
                      </td>
                      <td className='pl-2.5 md:pl-0'>
                        {order.cost && `${order.cost} ${order.currency}`}
                      </td>
                      <td className='pl-2.5 md:pl-0'>
                        {new Date(order.created).toLocaleString()}
                      </td>
                      <td className='pl-2.5 md:pl-0 text-blue-600 font-medium uppercase tracking-wide'>
                        {order.statusDisplay}
                      </td>
                      <td
                        onClick={() => goToOrder(order.id)}
                        className='cursor-pointer font-medium text-gray-800 pl-2.5 md:pl-0 pr-2.5 md:pr-0'
                      >
                        SHOW
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <NavigationNextPrevious
              previous={data?.previous}
              next={data?.next}
            />
          </>
        ) : (
          <div className='w-full my-5 text-xl font-medium tracking-wide text-center'>
            Nothing was found
          </div>
        )
      ) : null}
    </>
  );
};
const loadingSelector = createLoadingSelector(['SEARCH']);
const errorSelector = createErrorMessageSelector(['SEARCH']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  data: state.search?.orders,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  searchOrders,
})(Orders);
