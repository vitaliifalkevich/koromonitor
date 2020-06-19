import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { iconTypes } from '../../constants';
import '../../styles/icon.scss';
import { changeCurrentPage } from '../../actions/changeCurrentPage';
import { followCountry } from '../../actions/followCountry';

const Icon = props => {
  const {
    iconType,
    history,
    changeIndex,
    followCountries,
    countriesToFollow,
  } = props;

  const onButtonClick = useCallback(
    e => {
      if (iconType === iconTypes.statistic) {
        history.push(`/statistic/${props.countryName}`);
      } else if (iconType === iconTypes.back) {
        history.push(`/country/${props.countryName}`);
      } else if (iconType === iconTypes.trash) {
        let getCountryIndex = countriesToFollow.findIndex(
          item => item === props.countryName
        );
        let newCountryArray = Array.from(countriesToFollow);

        newCountryArray.splice(getCountryIndex, 1);
        followCountries(newCountryArray);
        history.push(`/`);
        changeIndex(0);
      } else {
        history.push(`/${e.target.id}`);
      }
    },
    [followCountries, props.countryName, changeIndex]
  );

  return (
    <React.Fragment>
      <button
        id={iconTypes[iconType]}
        className={'btn-icon ' + iconTypes[iconType]}
        onClick={onButtonClick}
      />
    </React.Fragment>
  );
};
const mapStateToProps = state => ({
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
export default connect(mapStateToProps, mapDispatchToProps)(Icon);
