import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from './layounts/Spinner';
import { btnTypes } from '../constants';
import Logo from './layounts/Logo';
import moment from 'moment';
import Icon from './layounts/Icon';
import { iconTypes, ERRORS, LIMIT_REQUEST_TIME } from '../constants';
import ErrorHandler from './ErrorHandler';
import { useDoubleTap } from 'use-double-tap';
import {
  getStatisticByCountry,
  getFakeStatisticByCountry,
} from '../actions/getStatisticByCountry';
import Pagination from './layounts/Pagination';
import BtnNavigate from './layounts/Buttons/BtnNavigate';
import backHomeListener from '../helpers/backButtonListener';
import { changeCurrentPage } from '../actions/changeCurrentPage';
import appExit from '../helpers/appExit';

const ByCountry = props => {
  const {
    isFetching,
    data,
    errorMsg,
    getActualStatisticByCountry,
    getActualButFakeStatisticByCountry,
    history,
    countriesToFollow,
    currentPage,
    changeIndex,
  } = props;
  const [limitState, setLimitState] = useState(0);
  const countryName = useMemo(() => {
    return props.history.location.pathname.slice(9);
  }, [history.location]);

  useEffect(() => {
    getActualStatisticByCountry(countryName);
  }, [history.location]);

  const onDoubleTap = useDoubleTap(() => {
    if (limitState === 0) {
      setLimitState(moment());
      getActualStatisticByCountry(countryName);
    } else {
      let compare = moment().diff(limitState, 'seconds');
      if (errorMsg === '') {
        if (compare > LIMIT_REQUEST_TIME) {
          getActualStatisticByCountry(countryName);
          setLimitState(0);
        } else {
          getActualButFakeStatisticByCountry();
        }
      } else {
        getActualStatisticByCountry(countryName);
        setLimitState(0);
      }
    }
  });
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
      console.log('component ByCountry did unmount!');
      window.removeEventListener('tizenhwkey', eventListenerInstanceHelper);
    };
  }, []);

  // useEffect(() => {
  //   backHomeListener(history, changeIndex);
  // }, []);

  const dataToShow = useMemo(
    () => (
      <React.Fragment>
        <h2>
          {countryName}{' '}
          <span className="lastCheck">
            {moment(data['record_date']).format('hh:mm:ss A')}
          </span>
        </h2>
        <ul className="cases">
          <li className="confirmed">
            <span>
              {data['total_cases']
                ? String(data['total_cases']).length < 8
                  ? 'Confirmed: '
                  : 'Conf: '
                : ''}
              <span className="numbers">{data['total_cases']}</span>
            </span>
          </li>
          <li className="recovered">
            <span>
              {data['total_cases']
                ? String(data['total_cases']).length < 8
                  ? 'Recovered: '
                  : 'Rec: '
                : ''}
              <span className="numbers">{data['total_recovered']}</span>
            </span>
          </li>
          <li className="deaths">
            <span>
              Deaths: <span className="numbers">{data['total_deaths']}</span>
            </span>
          </li>
        </ul>
        <Icon
          iconType={iconTypes.statistic}
          history={history}
          countryName={countryName}
        />
        <Icon iconType={iconTypes.settings} history={history} />
        <Icon
          iconType={iconTypes.trash}
          history={history}
          countryName={countryName}
        />
      </React.Fragment>
    ),
    [data]
  );
  return (
    <React.Fragment>
      <div className="ui-page ui-page-active" {...onDoubleTap}>
        <Pagination countryName={countryName} />
        <Logo />
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
        {countriesToFollow.length > 0 ? (
          <BtnNavigate
            btnType={btnTypes.prev}
            history={history}
            countryName={countriesToFollow[currentPage - 1]}
          />
        ) : (
          ''
        )}
        {countriesToFollow.length > 1 &&
        countriesToFollow.length > currentPage + 1 ? (
          <BtnNavigate
            btnType={btnTypes.next}
            history={history}
            countryName={countriesToFollow[currentPage + 1]}
          />
        ) : (
          ''
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isFetching: state.statisticByCountry.isFetching,
  data: state.statisticByCountry.data,
  errorMsg: state.statisticByCountry.errorMsg,
  countriesToFollow: state.countriesToFollow.data,
  currentPage: state.countriesToFollow.currentPage,
});
const mapDispatchToProps = dispatch => ({
  getActualStatisticByCountry: countryName => {
    dispatch(getStatisticByCountry(countryName));
  },
  getActualButFakeStatisticByCountry: () => {
    dispatch(getFakeStatisticByCountry());
  },
  changeIndex: index => {
    dispatch(changeCurrentPage(index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ByCountry);
