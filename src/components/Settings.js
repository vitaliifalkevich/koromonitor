import React, { useMemo, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Spinner from './layounts/Spinner';
import ErrorHandler from './ErrorHandler';
import { ERRORS, btnTypes } from '../constants';
import { getEffectedCountries } from '../actions/getEffectedCountries';
import Country from './CountryItemList';
import '../styles/settings.scss';
import BtnFollow from './layounts/Buttons/BtnFollow';
import backHomeListener from '../helpers/backButtonListener';
import { changeCurrentPage } from '../actions/changeCurrentPage';

const Settings = props => {
  const {
    isFetching,
    effectedCountries,
    errorMsg,
    getCountries,
    history,
    countChosenCountries,
    countriesFromTizenFile,
    changeIndex,
  } = props;

  useEffect(() => {
    getCountries(countriesFromTizenFile);
  }, [countriesFromTizenFile]);

  const eventListenerInstanceHelper = useCallback(
    event => {
      backHomeListener(event, history, changeIndex);
    },
    [backHomeListener]
  );
  useEffect(() => {
    window.addEventListener('tizenhwkey', eventListenerInstanceHelper, {
      passive: true,
    });
    return () => {
      window.removeEventListener('tizenhwkey', eventListenerInstanceHelper);
    };
  }, []);

  // useEffect(() => {
  //   backHomeListener(history, changeIndex);
  // }, []);

  const dataToShow = useMemo(() => {
    return (
      <React.Fragment>
        <h3 className="settings-title">Choose countries</h3>
        <div className="ui-content">
          <ul className="countries-list">
            {effectedCountries.map((item, idx) => (
              <Country
                key={idx}
                countryName={item.country}
                checked={item.checkStatus}
              />
            ))}
          </ul>
        </div>
        {countChosenCountries > 0 ? (
          <BtnFollow btnType={btnTypes.follow} history={history} />
        ) : (
          <BtnFollow btnType={btnTypes.unfollow} history={history} />
        )}
      </React.Fragment>
    );
  }, [effectedCountries, history]);
  return (
    <React.Fragment>
      <div id="settings-container" className="ui-page ui-page-active">
        {isFetching ? (
          <Spinner />
        ) : errorMsg === '' ? (
          dataToShow
        ) : (
          <ErrorHandler
            errorMsg={errorMsg}
            error={ERRORS.ERROR_DATA_FETCHING}
          />
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isFetching: state.effectedCountries.isFetching,
  effectedCountries: state.effectedCountries.data,
  errorMsg: state.effectedCountries.errorMsg,
  countChosenCountries: state.effectedCountries.countChosenCountries,
  countriesFromTizenFile: state.countriesToFollow.data,
});
const mapDispatchToProps = dispatch => ({
  getCountries: countriesFromTizen => {
    dispatch(getEffectedCountries(countriesFromTizen));
  },
  changeIndex: index => {
    dispatch(changeCurrentPage(index));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
