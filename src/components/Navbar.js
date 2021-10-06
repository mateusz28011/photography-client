import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import NavbarMenuBtn from './NavbarMenuBtn';
import { motion, AnimatePresence } from 'framer-motion';

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
          'links',
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
    <nav className='shadow-md text-white z-50 bg-blue-600'>
      <div
        id='menu'
        className=' flex flex-col md:flex-row items-center w-full mx-auto text-center md:justify-between 2xl:container relative'
      >
        <div className='flex w-full justify-between mx-3 md:ml-6 lg:ml-8'>
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
        {!isSmallScreen && <NavLinks user={user} logoutUser={logoutUser} />}
      </div>
      <AnimatePresence>
        {isMenuOpen && isSmallScreen && (
          <NavLinks
            user={user}
            logoutUser={logoutUser}
            isSmallScreen={isSmallScreen}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLinks = ({ user, logoutUser, isSmallScreen }) => {
  const location = useLocation();
  const currentLink = 'border-b-2 rounded';

  return (
    <motion.div
      initial={isSmallScreen && { y: '-100%', opacity: 0, zIndex: -1 }}
      transition={isSmallScreen && { type: 'spring', duration: 1 }}
      animate={isSmallScreen && { y: 0, opacity: 1 }}
      exit={
        isSmallScreen && {
          y: '-100%',
          opacity: 0,
          transition: { duration: 0.2 },
        }
      }
      id='menuLinks'
      className='bg-blue-600 w-full md:justify-end flex space-y-3 py-5 uppercase text-2xl flex-col md:normal-case md:flex-row md:space-y-0 md:space-x-4 md:mr-6 lg:text-2xl lg:mr-8 absolute md:static border-b-2 border-t-2 md:border-0'
    >
      <div
        id='links'
        className='flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4 items-center'
      >
        <Link
          className={
            location.pathname.startsWith('/search') ? currentLink : undefined
          }
          to='/search'
        >
          Vendors
        </Link>
        {user ? (
          <>
            <Link
              className={
                location.pathname.startsWith('/account')
                  ? currentLink
                  : undefined
              }
              to='/account/'
            >
              Account
            </Link>
            <Link
              className={
                location.pathname.startsWith('/orders')
                  ? currentLink
                  : undefined
              }
              to='/orders/'
            >
              Orders
            </Link>
            {user.isVendor && (
              <Link
                className={
                  location.pathname.startsWith('/albums')
                    ? currentLink
                    : undefined
                }
                to='/albums/'
              >
                Albums
              </Link>
            )}
            <Link to='/' onClick={logoutUser}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to='/login'>Sign In</Link>
            <div className='border-2 rounded-md px-2 py-0.5 mb-4'>
              <Link to='/register'>Sign Up</Link>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
