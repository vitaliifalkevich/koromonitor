import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { btnTypes } from '../../../constants';
import '../../../styles/button.scss';
import { changeCurrentPage } from '../../../actions/changeCurrentPage';

const Button = props => {
  const {
    btnType,
    countryName,
    history,
    changeIndex,
    countriesToFollow,
  } = props;

  const onButtonClick = useCallback(
    e => {
      if (countryName) {
        history.push(`/country/${countryName}`);
        changeIndex(countriesToFollow.findIndex(item => item === countryName));
      } else {
        history.push(`/`);
        changeIndex(0);
      }
    },
    [countryName, countriesToFollow]
  );

  return (
    <React.Fragment>
      <button
        id={btnTypes[btnType]}
        className={'btn ' + btnTypes[btnType]}
        onClick={onButtonClick}
      >
        <span>{countryName === undefined ? 'Global' : countryName}</span>
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  countriesToFollow: state.countriesToFollow.data,
});
const mapDispatchToProps = dispatch => ({
  changeIndex: index => {
    dispatch(changeCurrentPage(index));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Button);
