import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NavigationNextPrevious = ({ next, previous, searchFunc, className }) => {
  const location = useLocation();
  const history = useHistory();

  const updateLocation = (url) => {
    const { query } = queryString.parseUrl(url);
    history.push(`${location.pathname}?${queryString.stringify(query)}`);
  };

  const getQuery = (url) => {
    return `?${queryString.stringify(queryString.parseUrl(url).query)}`;
  };

  return (
    <div
      className={
        'flex w-full bg-white shadow rounded-lg items-center justify-center mb-3 py-4 text-2xl space-x-12 text-blue-600' +
        (className ? ` ${className}` : ' ')
      }
    >
      {
        <motion.div
          whileHover={{
            scale: previous ? 1.2 : undefined,
          }}
          onClick={
            previous &&
            (() =>
              searchFunc
                ? searchFunc(getQuery(previous))
                : updateLocation(previous))
          }
        >
          <FaChevronLeft
            className={previous ? 'cursor-pointer ' : ' text-blue-200'}
          />
        </motion.div>
      }
      {
        <motion.div
          whileHover={{
            scale: next ? 1.2 : undefined,
          }}
          onClick={
            next &&
            (() =>
              searchFunc ? searchFunc(getQuery(next)) : updateLocation(next))
          }
        >
          <FaChevronRight
            className={next ? 'cursor-pointer ' : ' text-blue-200'}
          />
        </motion.div>
      }
    </div>
  );
};

export default NavigationNextPrevious;
