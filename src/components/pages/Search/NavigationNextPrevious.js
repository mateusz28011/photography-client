import React from 'react';
import { connect } from 'react-redux';
import { loadNext, loadPrevious } from '../../../actions/search';

const NavigationNextPrevious = ({
  next,
  previous,
  count,
  loadNext,
  loadPrevious,
}) => {
  return (
    <div>
      {previous && <div onClick={() => loadPrevious(previous)}>previous</div>}
      {next && <div onClick={() => loadNext(next)}>next</div>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  next: state.search.data?.next,
  previous: state.search.data?.previous,
  count: state.search.data?.count,
});

export default connect(mapStateToProps, { loadNext, loadPrevious })(
  NavigationNextPrevious
);
