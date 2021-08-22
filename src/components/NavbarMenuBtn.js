import React from 'react';
import { motion } from 'framer-motion';

const Path = (props) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='white'
    strokeLinecap='round'
    {...props}
  />
);

const NavbarMenuBtn = ({ isMenuOpen, toggleMenu, className }) => {
  return (
    <motion.button
      className={className}
      onClick={toggleMenu}
      initial={false}
      animate={isMenuOpen ? 'open' : 'closed'}
    >
      <svg id='menuBtn' width='23' height='23' viewBox='0 0 23 23'>
        <Path
          id='path1'
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          id='path2'
          d='M 2 9.423 L 20 9.423'
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          id='path3'
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </motion.button>
  );
};

export default NavbarMenuBtn;
