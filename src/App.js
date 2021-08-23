import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from './actions/auth';
import doesHttpOnlyCookieExist from './utils/doesHttpOnlyCookieExist';
import Search from './components/pages/Search/Search';
import Vendor from './components/pages/Vendor/Vendor';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

const App = () => {
  useEffect(() => {
    if (doesHttpOnlyCookieExist('refresh-token')) store.dispatch(getUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='max-w-screen-2xl min-h-screen mx-auto'>
        <Navbar />
        <div className='px-6'>
          <Switch>
            <Route exact path='/'>
              CO
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <Route exact path='/vendor'>
              <Search />
            </Route>
            <Route exact path='/vendor/:vendorid'>
              <Vendor />
            </Route>
            <Route>CO</Route>
          </Switch>
        </div>
      </div>
    </Provider>
  );
};

export default App;
