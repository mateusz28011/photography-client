import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVendor } from '../../../actions/vendor';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import ApiError from '../../ApiError';

const Vendor = ({ loading, error, data, getVendor }) => {
  const { vendorid } = useParams();

  useEffect(() => {
    console.log('fetch vendor');
    getVendor(vendorid);
  }, [getVendor, vendorid]);

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : error ? (
        <ApiError error={error} />
      ) : (
        data && <div>{data.name}</div>
      )}
    </div>
  );
};

const loadingSelector = createLoadingSelector(['GET_VENDOR']);
const errorSelector = createErrorMessageSelector(['GET_VENDOR']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  data: state.vendor.data,
});

export default connect(mapStateToProps, { getVendor })(Vendor);
