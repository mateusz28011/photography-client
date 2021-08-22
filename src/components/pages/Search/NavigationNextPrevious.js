import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const NavigationNextPrevious = ({ next, previous }) => {
  const location = useLocation();
  const history = useHistory();

  const updateLocation = (url) => {
    const { query } = queryString.parseUrl(url);
    history.push(`${location.pathname}?${queryString.stringify(query)}`);
  };

  return (
    <div className='flex'>
      {previous && <div onClick={() => updateLocation(previous)}>previous</div>}
      {next && <div onClick={() => updateLocation(next)}>next</div>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  next: state.search.data?.next,
  previous: state.search.data?.previous,
  // count: state.search.data?.count,
});

export default connect(mapStateToProps)(NavigationNextPrevious);
