import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import '../../styles/pagination.scss';

const Pagination = props => {
  const { countriestoFollow, currentPage, countryName } = props;

  const dataToShow = useMemo(() => {
    let newArray = countriestoFollow.map((item, idx) => (
      <li key={idx + 1} className="pagDot" />
    ));
    if (countryName) {
      newArray.splice(
        currentPage + 1,
        0,
        <li key="active" className="pagDot active" />
      );
    } else {
      newArray.splice(
        currentPage,
        0,
        <li key="active" className="pagDot active" />
      );
    }
    return newArray;
  }, [countriestoFollow, currentPage]);

  return (
    <React.Fragment>
      <ul className="paginationContainer">{dataToShow}</ul>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  countriestoFollow: state.countriesToFollow.data,
  currentPage: state.countriesToFollow.currentPage,
});
export default connect(mapStateToProps)(Pagination);
