import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NavigationNextPrevious = ({ next, previous }) => {
  const location = useLocation();
  const history = useHistory();

  const updateLocation = (url) => {
    const { query } = queryString.parseUrl(url);
    history.push(`${location.pathname}?${queryString.stringify(query)}`);
  };

  return (
    <div className='flex w-full bg-white shadow rounded items-center justify-center py-4 text-2xl space-x-12 text-gray-600'>
      {
        <div onClick={previous && (() => updateLocation(previous))}>
          <FaChevronLeft
            className={previous ? 'cursor-pointer ' : ' text-gray-300'}
          />
        </div>
      }
      {
        <div onClick={next && (() => updateLocation(next))}>
          <FaChevronRight
            className={next ? 'cursor-pointer ' : ' text-gray-300'}
          />
        </div>
      }
    </div>
  );
};

export default NavigationNextPrevious;
