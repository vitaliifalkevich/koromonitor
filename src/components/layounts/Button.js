import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { btnTypes } from '../../constants';
import '../../styles/button.scss';
import { followCountry } from '../../actions/followCountry';
import { changeCurrentPage } from '../../actions/changeCurrentPage';

const Button = props => {
  const { btnType, countryName, history, followCountries, checkedCountries, changeIndex, countriesToFollow } = props;

  const onButtonClick = useCallback(
    e => {
      if (btnType === btnTypes.follow) {
        followCountries(checkedCountries);
      }
      if(countryName) {
          history.push(`/country/${countryName}`);
      }
      else {
          history.push(`/${e.target.id}`);
      }
      console.log('expected an array from countries to follow: ', countriesToFollow);
        changeIndex(countriesToFollow.findIndex(item => item === countryName));
    },
    [checkedCountries, followCountries, countryName, countriesToFollow]
  );

  return (
    <React.Fragment>
      {console.log(props)}
      <button
        id={btnTypes[btnType]}
        className={'btn ' + btnTypes[btnType]}
        onClick={onButtonClick}
      >
        <span>{countryName ? countryName : btnType}</span>
      </button>
    </React.Fragment>
  );
};

const mapStateTOProps = state => ({
  checkedCountries: state.effectedCountries.data
    .filter(item => item.checkStatus === true)
    .map(item => item.country),
    countriesToFollow: state.countriesToFollow.data,
});
const mapDispatchToProps = dispatch => ({
  followCountries: countriesList => {
    dispatch(followCountry(countriesList));
  },
    changeIndex: index => {
        dispatch(changeCurrentPage(index));
    },
});
export default connect(mapStateTOProps, mapDispatchToProps)(Button);
