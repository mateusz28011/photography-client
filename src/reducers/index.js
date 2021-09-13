import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import error from './error';
import search from './search';
import vendor from './vendor';
import album from './album';
import order from './order';

export default combineReducers({
  auth,
  loading,
  error,
  search,
  vendor,
  album,
  order,
});
