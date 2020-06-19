import { FOLLOW_UNFOLLOW_COUNTRY } from '../constants';
import { makeCountryRecord } from '../helpers/readAndWriteToFileSystem';
import { readCountriesFromFile } from './readCountriesFromFile';

export const followCountry = countriesArray => {
  console.log(
    'countriesArray from action followCountry',
    countriesArray.toString()
  );

  return dispatch => {
    try {
      makeCountryRecord(countriesArray.toString(), res => {
        //dispatch({type: FOLLOW_UNFOLLOW_COUNTRY, payload: res});
        dispatch(readCountriesFromFile());
      });
    } catch (err) {
      console.log('error: ', err.message);
    }
  };
};
