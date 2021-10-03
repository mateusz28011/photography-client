import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import NavbarMenuBtn from './NavbarMenuBtn';

const Navbar = ({ user, logoutUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleIsSmallScreen = () => {
    setIsSmallScreen((prev) => !prev);
  };

  useEffect(() => {
    const checkIsSmallScreen = () => {
      const check = window.innerWidth <= 768 ? true : false;
      if (isSmallScreen !== check) {
        toggleIsSmallScreen();
      }
    };

    checkIsSmallScreen();
    window.addEventListener('resize', checkIsSmallScreen);
    return () => {
      window.removeEventListener('resize', checkIsSmallScreen);
    };
  }, [isSmallScreen]);

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };

    const hideMenuClick = (e) => {
      if (
        ![
          'path1',
          'path2',
          'path3',
          'menu',
          'menuBtn',
          'menuLinks',
          'vendors',
          'albums',
          'account',
          'login',
          'register',
        ].includes(e.target.id)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', hideMenu);
    window.addEventListener('click', hideMenuClick);
    return () => {
      window.removeEventListener('resize', hideMenu);
      window.removeEventListener('click', hideMenuClick);
    };
  }, []);

  return (
    <div className='bg-blue-600 shadow z-20'>
      <nav
        id='menu'
        className='flex flex-col md:flex-row items-center w-full mx-auto text-center text-white md:justify-between  2xl:container'
      >
        <div className='flex w-full md:w-auto justify-between mx-3 md:ml-6 lg:ml-8'>
          <Link
            to='/'
            className='text-3xl md:text-4xl m-2 md:m-0 font-medium flex items-center'
          >
            <span>PhotoBay</span>
          </Link>
          <NavbarMenuBtn
            className='focus:outline-none m-5 md:hidden transform scale-150'
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
          />
        </div>
        {(isMenuOpen || !isSmallScreen) && (
          <div
            id='menuLinks'
            className='flex space-y-3 py-5 uppercase text-2xl flex-col  md:normal-case md:flex-row md:space-y-0 md:space-x-4  md:mr-6 lg:text-2xl lg:mr-8 '
          >
            <div className='flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4 items-center'>
              <Link id='vendors' to='/search'>
                Vendors
              </Link>
              {user ? (
                <>
                  <Link id='account' to='/account/'>
                    Account
                  </Link>

                  <Link id='orders' to='/orders/'>
                    Orders
                  </Link>

                  {user.isVendor && (
                    <Link id='albums' to='/albums/'>
                      Albums
                    </Link>
                  )}
                  <Link id='logout' to='/' onClick={logoutUser}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link id='login' to='/login'>
                    Sign In
                  </Link>
                  <div
                    id='register'
                    className='border-2 rounded-md px-2 py-0.5 mb-4'
                  >
                    <Link to='/register'>Sign Up</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
