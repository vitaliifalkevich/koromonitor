import React, { useMemo, useEffect, useState } from 'react';
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
  getGlobalStatistic,
  getFakeGlobalStatistic,
} from '../actions/getGlobalStatistic';
import Pagination from './layounts/Pagination';

import { deleteFiles } from '../helpers/readAndWriteToFileSystem';
import BtnNavigate from './layounts/Buttons/BtnNavigate';
import appExit from '../helpers/appExit';

const Global = props => {
  const {
    isFetching,
    data,
    errorMsg,
    getActualGlobalStatistic,
    getActualButFakeGlobalStatistic,
    history,
    countriesToFollow,
    nextCountryAfterGlobal,
  } = props;

  const [limitState, setLimitState] = useState(0);

  // useEffect(() => {
  //   deleteFiles();
  // }, []);

  useEffect(() => {
    window.addEventListener('tizenhwkey', appExit, { passive: true });
    return () => {
      console.log("component Global did unmount!");
      window.removeEventListener('tizenhwkey', appExit);
    };
  }, []);

  const onDoubleTap = useDoubleTap(() => {
    if (limitState === 0) {
      setLimitState(moment());
      getActualGlobalStatistic();
    } else {
      let compare = moment().diff(limitState, 'seconds');
      if (errorMsg === '') {
        if (compare > LIMIT_REQUEST_TIME) {
          getActualGlobalStatistic();
          setLimitState(0);
        } else {
          getActualButFakeGlobalStatistic();
        }
      } else {
        getActualGlobalStatistic();
        setLimitState(0);
      }
    }
  });

  const dataToShow = useMemo(
    () => (
      <React.Fragment>
        <h2>
          Globally{' '}
          <span className="lastCheck">
            {moment(data['statistic_taken_at']).format('hh:mm:ss A')}
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
                ? data['total_cases'].length < 8
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
        <Icon iconType={iconTypes.settings} history={history} />
      </React.Fragment>
    ),
    [data]
  );
  return (
    <React.Fragment>
      <div className="ui-page ui-page-active" {...onDoubleTap}>
        <Pagination />
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
            btnType={btnTypes.next}
            history={history}
            countryName={countriesToFollow[nextCountryAfterGlobal]}
          />
        ) : (
          ''
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isFetching: state.globalStatistic.isFetching,
  data: state.globalStatistic.data,
  errorMsg: state.globalStatistic.errorMsg,
  countriesToFollow: state.countriesToFollow.data,
  nextCountryAfterGlobal: state.countriesToFollow.currentPage,
});
const mapDispatchToProps = dispatch => ({
  getActualGlobalStatistic: () => {
    dispatch(getGlobalStatistic());
  },
  getActualButFakeGlobalStatistic: () => {
    dispatch(getFakeGlobalStatistic());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Global);
