import {
  START_STATISTIC_BY_COUNTRY,
  STATISTIC_BY_COUNTRY_RECEIVED,
  STATISTIC_BY_COUNTRY_ERROR,
  API_KEY,
  RAPID_HOST,
  URL_GET_STATISTIC_BY_COUNTRY,
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

export const getStatisticByCountry = countryName => {
  return dispatch => {
    dispatch({ type: START_STATISTIC_BY_COUNTRY });
    axios
      .get(`${URL_GET_STATISTIC_BY_COUNTRY}?country=${countryName}`, config)
      .then(res => {
        dispatch({
          type: STATISTIC_BY_COUNTRY_RECEIVED,
          payload: res.data['latest_stat_by_country'][0],
        });
      })
      .catch(error => {
        dispatch({ type: STATISTIC_BY_COUNTRY_ERROR, payload: error.message });
      });
  };
};
export const getFakeStatisticByCountry = () => {
  return dispatch => {
    dispatch({ type: START_STATISTIC_BY_COUNTRY });
    setTimeout(() => {
      dispatch({ type: STATISTIC_BY_COUNTRY_RECEIVED, payload: undefined });
    }, 1000);
    console.log('fake action creator');
  };
};
