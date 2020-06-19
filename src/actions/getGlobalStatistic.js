import {
  START_GLOBAL_STATISTIC,
  API_KEY,
  RAPID_HOST,
  URL_GET_GLOBAL_STATISTIC,
  GLOBAL_STATISTIC_RECEIVED,
  GLOBAL_STATISTIC_ERROR,
} from '../constants';
import axios from 'axios';

const config = {
  headers: {
    'x-rapidapi-host': RAPID_HOST,
    'x-rapidapi-key': API_KEY,
  },
};

export const getGlobalStatistic = () => {
  return dispatch => {
    dispatch({ type: START_GLOBAL_STATISTIC });
    axios
      .get(URL_GET_GLOBAL_STATISTIC, config)
      .then(res => {
        dispatch({ type: GLOBAL_STATISTIC_RECEIVED, payload: res.data });
      })
      .catch(error => {
        console.log(error.message);
        dispatch({ type: GLOBAL_STATISTIC_ERROR, payload: error.message });
      });
  };
};

export const getFakeGlobalStatistic = () => {
  return dispatch => {
    dispatch({ type: START_GLOBAL_STATISTIC });
    setTimeout(() => {
      dispatch({ type: GLOBAL_STATISTIC_RECEIVED, payload: undefined });
    }, 1000);
    console.log('fake action creator');
  };
};
