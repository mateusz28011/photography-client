import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  createErrorMessageSelector,
  createLoadingSelector,
} from '../../../selectors';
import { getNotes } from '../../../actions/notes';
import Loading from '../../Loading';
import ApiError from '../../ApiError';
import NavigationNextPrevious from '../Search/NavigationNextPrevious';
import Message from './Message';

const Notes = ({
  loading,
  error,
  data,
  orderId,
  userId,
  isVendor,
  getNotes,
}) => {
  useEffect(() => {
    orderId && getNotes(orderId);
  }, [orderId, getNotes]);

  const handlePagination = (query) => {
    getNotes(orderId, query);
  };

  return loading ? (
    <Loading className='py-32' />
  ) : error ? (
    <ApiError error={error} center />
  ) : (
    <>
      {data?.results?.length !== 0 && (
        <>
          <div className='bg-white shadow rounded-lg p-5 flex flex-col-reverse'>
            {data?.results.map((note, index) => (
              <div
                key={index}
                className={
                  'py-3 px-4 rounded-xl sm:w-1/2 my-3' +
                  (userId === note.user
                    ? ' bg-blue-100'
                    : ' bg-gray-100 ml-auto')
                }
              >
                <div className='text-blue-600 font-medium relative text-lg'>
                  {userId === note.user ? 'Me' : isVendor ? 'Client' : 'Vendor'}
                  <div className='absolute right-0 top-0.5 text-base font-normal'>
                    {new Date(note.created).toLocaleString()}
                  </div>
                </div>
                {note.note}
              </div>
            ))}
          </div>
          {(data?.previous || data?.next) && (
            <NavigationNextPrevious
              next={data.previous}
              previous={data.next}
              searchFunc={handlePagination}
            />
          )}
        </>
      )}
      <Message orderId={orderId} />
    </>
  );
};

const loadingSelector = createLoadingSelector(['GET_NOTES']);
const errorSelector = createErrorMessageSelector(['GET_NOTES']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  data: state.notes.data,
  userId: state.auth.user?.id,
});

export default connect(mapStateToProps, {
  getNotes,
})(Notes);
