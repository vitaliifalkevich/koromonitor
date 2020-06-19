import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from 'react';
import { connect } from 'react-redux';
import Logo from './layounts/Logo';
import Spinner from './layounts/Spinner';
import ErrorHandler from './ErrorHandler';
import { ERRORS, iconTypes, LIMIT_REQUEST_TIME } from '../constants';
import { useDoubleTap } from 'use-double-tap';
import moment from 'moment';
import backHomeListener from '../helpers/backButtonListener';
import Icon from './layounts/Icon';
import {
  getStatisticHistory,
  getFakeStatisticHistory,
} from '../actions/getStatisticHistory';
import { changeCurrentPage } from '../actions/changeCurrentPage';
import Chart from 'chart.js';

const Statistic = props => {
  const {
    isFetching,
    statistic,
    errorMsg,
    history,
    countriesToFollow,
    changeIndex,
    getActualStatisticHistory,
    getActualButFakeStatisticHistory,
  } = props;
  const [limitState, setLimitState] = useState(0);

  const countryName = useMemo(() => {
    return history.location.pathname.slice(11);
  }, [history.location]);

  const onDoubleTap = useDoubleTap(() => {
    if (limitState === 0) {
      setLimitState(moment());
      getActualStatisticHistory(countryName);
    } else {
      let compare = moment().diff(limitState, 'seconds');
      if (errorMsg === '') {
        if (compare > LIMIT_REQUEST_TIME) {
          getActualStatisticHistory(countryName);
          setLimitState(0);
        } else {
          getActualButFakeStatisticHistory();
        }
      } else {
        getActualStatisticHistory(countryName);
        setLimitState(0);
      }
    }
  });
  useEffect(() => {
    getActualStatisticHistory(countryName);
  }, [countryName]);

  const eventListenerInstanceHelper = useCallback(
    event => {
      backHomeListener(
        event,
        history,
        changeIndex,
        countryName,
        countriesToFollow
      );
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
  //   backHomeListener(history, changeIndex, countryName, countriesToFollow);
  // }, []);

  useEffect(() => {
    let canvasContainer = document.getElementById('coroChart');
    if (statistic.length > 0 && canvasContainer) {
      let ctx = canvasContainer.getContext('2d');
      let arrayConfirmed = statistic.map(item =>
        item['total_cases'] !== ''
          ? Number(item['total_cases'].replace(/,/g, ''))
          : 0
      );
      let arrayDeaths = statistic.map(item =>
        item['total_deaths'] !== ''
          ? Number(item['total_deaths'].replace(/,/g, ''))
          : 0
      );
      let arrayRecovered = statistic.map(item =>
        item['total_recovered'] !== ''
          ? Number(item['total_recovered'].replace(/,/g, ''))
          : 0
      );

      let arrayLabels = [];
      for (let i = 0; statistic.length > i; i++) {
        arrayLabels.push('');
      }
      let chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: arrayLabels,
          datasets: [
            {
              label: 'Confirmed',
              borderColor: '#f7de0f',
              pointRadius: 0,
              data: arrayConfirmed,
            },
            {
              label: 'Recovered',
              borderColor: '#bcfb59',
              pointRadius: 0,
              data: arrayRecovered,
            },
            {
              label: 'Deaths: ',
              borderColor: '#ff0808',
              pointRadius: 0,
              data: arrayDeaths,
            },
          ],
        },
        // Configuration options go here
        options: {
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 10,
            },
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: '#ffffff',
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: '#ffffff',
                },
              },
            ],
          },
          legend: {
            display: false,
          },
        },
      });
    }
  }, [isFetching, statistic]);

  const canvas = useMemo(() => {
    return <canvas id="coroChart" />;
  }, [statistic]);
  return (
    <React.Fragment>
      <div className="ui-page ui-page-active" {...onDoubleTap}>
        <Logo />
        {isFetching ? (
          <Spinner />
        ) : errorMsg === '' ? (
          <React.Fragment>
            <h2>{countryName} </h2>
            {canvas}
            <Icon
              iconType={iconTypes.back}
              history={history}
              countryName={countryName}
            />
          </React.Fragment>
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
  isFetching: state.statisticHistory.isFetching,
  statistic: state.statisticHistory.data,
  errorMsg: state.statisticHistory.errorMsg,
  countriesToFollow: state.countriesToFollow.data,
});
const mapDispatchToProps = dispatch => ({
  getActualStatisticHistory: countryName => {
    dispatch(getStatisticHistory(countryName));
  },
  getActualButFakeStatisticHistory: () => {
    dispatch(getFakeStatisticHistory());
  },
  changeIndex: index => {
    dispatch(changeCurrentPage(index));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
