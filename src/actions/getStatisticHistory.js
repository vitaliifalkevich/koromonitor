import {
  START_STATISTIC_HISTORY,
  STATISTIC_HISTORY_RECEIVED,
  STATISTIC_HISTORY_ERROR,
  API_KEY,
  RAPID_HOST,
  URL_GET_STATISTIC_HISTORY,
  START_GLOBAL_STATISTIC,
  GLOBAL_STATISTIC_RECEIVED,
} from '../constants';
import axios from 'axios';

const config = {
  headers: {
    'x-rapidapi-host': RAPID_HOST,
    'x-rapidapi-key': API_KEY,
  },
};

export const getStatisticHistory = countryName => {
  return dispatch => {
    dispatch({ type: START_STATISTIC_HISTORY });
    axios
      .get(`${URL_GET_STATISTIC_HISTORY}?country=${countryName}`, config)
      .then(res => {
        console.log('statistic history is: ', res);
        let last30RecordsArray = res.data['stat_by_country'];
        dispatch({
          type: STATISTIC_HISTORY_RECEIVED,
          payload: last30RecordsArray,
        });
      })
      .catch(error => {
        dispatch({ type: STATISTIC_HISTORY_ERROR, payload: error.message });
      });
  };
};
export const getFakeStatisticHistory = () => {
  return dispatch => {
    dispatch({ type: START_STATISTIC_HISTORY });
    setTimeout(() => {
      dispatch({ type: STATISTIC_HISTORY_RECEIVED, payload: undefined });
    }, 1000);
    console.log('fake action creator');
  };
};
