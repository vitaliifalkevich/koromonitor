import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { changeCheckStatusCountry } from '../actions/changeCheckStatusCountry';

const CountryItemList = props => {
  const { countryName, checked, changeFollowStatus } = props;
  const changeFollowCountryStatus = useCallback(
    e => {
      let countryName = e.target.textContent;
      if (countryName !== '') {
        changeFollowStatus(e.target.textContent, !checked);
      }
    },
    [checked]
  );

  return (
    <React.Fragment>
      <li
        className={checked ? 'checked' : ''}
        onClick={changeFollowCountryStatus}
      >
        <span>{countryName}</span>
      </li>
    </React.Fragment>
  );
};

const mapDispatchToState = dispatch => ({
  changeFollowStatus: (countryName, isChecked) => {
    dispatch(changeCheckStatusCountry(countryName, isChecked));
  },
});
export default connect(null, mapDispatchToState)(CountryItemList);
