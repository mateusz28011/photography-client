import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from './actions/auth';
import doesHttpOnlyCookieExist from './utils/doesHttpOnlyCookieExist';
import Search from './components/pages/Search/Search';
import Vendor from './components/pages/Vendor/Vendor';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import PrivateRoute from './PrivateRoute';
import Footer from './components/Footer';
import Albums from './components/pages/Albums/Albums';
import Order from './components/pages/Order/Order';
import Orders from './components/pages/Orders/Orders';
import Home from './components/pages/Home/Home';
import Account from './components/pages/Account/Account';
import Album from './components/Album/Album';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import Preview from './components/Album/Preview';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (doesHttpOnlyCookieExist('refresh-token')) store.dispatch(getUser());
  }, []);
  return (
    <Provider store={store}>
      <Preview />
      <Navbar />
      <AnimateSharedLayout>
        <div className='max-w-screen-2xl min-h-screen mx-auto w-full'>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/register'>
                <Register />
              </Route>
              <Route exact path='/search'>
                <Search />
              </Route>
              <Route exact path='/vendor/:profileId'>
                <Vendor />
              </Route>
              <PrivateRoute exact path='/orders/' component={Orders} />
              <PrivateRoute exact path='/order/:orderId' component={Order} />
              <PrivateRoute
                exact
                path='/albums/'
                component={Albums}
                isVendorRoute
              />
              <PrivateRoute exact path='/account/' component={Account} />
              <Route exact path='/album/' component={Album} />
              <Route>
                <Home />
              </Route>
            </Switch>
          </AnimatePresence>
        </div>
        <Footer />
      </AnimateSharedLayout>
    </Provider>
  );
};

export default App;
