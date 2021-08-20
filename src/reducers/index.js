import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import error from './error';
import search from './search';

export default combineReducers({ auth, loading, error, search });
