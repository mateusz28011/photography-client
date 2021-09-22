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
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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
            <div className='bg-white rounded-lg my-4 shadow py-4 sm:px-4 '>
              <Table className='table-auto bg-white w-full text-center text-base sm:shadow'>
                <Thead>
                  <Tr className='bg-blue-600 text-base md:text-lg text-white'>
                    <Th className='py-2'>Vendor</Th>
                    <Th>Client</Th>
                    <Th>Cost</Th>
                    <Th>Order date</Th>
                    <Th>Status</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody className='border-t border-b border-blue-200 sm:border-0 divide-y divide-solid divide-blue-200'>
                  {orders.map((order, index) => (
                    <Tr className='border-0' key={index}>
                      <Td className='py-1'>
                        {order.vendor.id === user.id ? (
                          <span className=' text-blue-600 font-medium'>Me</span>
                        ) : (
                          order.profileName
                        )}
                      </Td>
                      <Td>
                        {order.client.id === user.id ? (
                          <span className=' text-blue-600 font-medium'>Me</span>
                        ) : (
                          `${order.client.firstName} ${order.client.lastName}`
                        )}
                      </Td>
                      <Td>
                        {order.cost ? `${order.cost} ${order.currency}` : '-'}
                      </Td>
                      <Td>{new Date(order.created).toLocaleString()}</Td>
                      <Td>
                        <span className='text-blue-600 font-medium uppercase tracking-wid'>
                          {order.statusDisplay}
                        </span>
                      </Td>
                      <Td>
                        <button
                          onClick={() => goToOrder(order.id)}
                          className='bg-blue-600 cursor-pointer active:bg-blue-500 px-2 py-1.5 my-1 sm:py-1 sm:my-0.5 w-full rounded-md shadow-sm font-medium text-white'
                        >
                          SHOW
                        </button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
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
