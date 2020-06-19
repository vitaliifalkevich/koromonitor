import {
  START_EFFECTED_COUNTRIES,
  API_KEY,
  RAPID_HOST,
  URL_GET_EFFECTED_COUNTRIES,
  EFFECTED_COUNTRIES_RECEIVED,
  EFFECTED_COUNTRIES_ERROR,
} from '../constants';
import axios from 'axios';

const config = {
  headers: {
    'x-rapidapi-host': RAPID_HOST,
    'x-rapidapi-key': API_KEY,
  },
};
export const getEffectedCountries = countriesFromTizen => {
  return dispatch => {
    dispatch({ type: START_EFFECTED_COUNTRIES });
    axios
      .get(URL_GET_EFFECTED_COUNTRIES, config)
      .then(res => {
        /*Injection with initial check status*/
        let dataWithInjection = res.data['affected_countries'].map(item => {
          if (countriesFromTizen.includes(item)) {
            return { country: item, checkStatus: true };
          } else {
            return { country: item, checkStatus: false };
          }
        });
        dataWithInjection.push({
          country: '',
          checkStatus: false,
        });
        dispatch({
          type: EFFECTED_COUNTRIES_RECEIVED,
          payload: dataWithInjection,
        });
      })
      .catch(error => {
        console.log(error.message);
        dispatch({ type: EFFECTED_COUNTRIES_ERROR, payload: error.message });
      });
  };
};
