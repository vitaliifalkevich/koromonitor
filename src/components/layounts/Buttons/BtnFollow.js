import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { btnTypes } from '../../../constants';
import '../../../styles/button.scss';
import { followCountry } from '../../../actions/followCountry';
import { changeCurrentPage } from '../../../actions/changeCurrentPage';

const BtnFollow = props => {
  const {
    btnType,
    history,
    followCountries,
    checkedCountries,
    changeIndex,
  } = props;

  const onButtonClick = useCallback(
    e => {
      followCountries(checkedCountries);
      history.push(`/`);
      changeIndex(0);
    },
    [checkedCountries, followCountries, changeIndex]
  );

  return (
    <React.Fragment>
      <button
        id={btnTypes[btnType]}
        className={'btn ' + btnTypes[btnType]}
        onClick={onButtonClick}
      >
        <span>{btnType}</span>
      </button>
    </React.Fragment>
  );
};

const mapStateTOProps = state => ({
  checkedCountries: state.effectedCountries.data
    .filter(item => item.checkStatus === true)
    .map(item => item.country),
});
const mapDispatchToProps = dispatch => ({
  followCountries: countriesList => {
    dispatch(followCountry(countriesList));
  },
  changeIndex: index => {
    dispatch(changeCurrentPage(index));
  },
});
export default connect(mapStateTOProps, mapDispatchToProps)(BtnFollow);
