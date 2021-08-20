import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';
import LoginRegister from './components/pages/LoginRegister/LoginRegister';
import { useEffect } from 'react';
import { getUser } from './actions/auth';
import doesHttpOnlyCookieExist from './utils/doesHttpOnlyCookieExist';
import Search from './components/pages/Search/Search';

const App = () => {
  useEffect(() => {
    if (doesHttpOnlyCookieExist('refresh-token')) store.dispatch(getUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='max-w-screen-2xl bg-gray-200 min-h-screen mx-auto'>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            CO
          </Route>
          <Route exact path='/login-register'>
            <LoginRegister />
          </Route>
          <Route exact path='/search'>
            <Search />
          </Route>
          <Route>CO</Route>
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
