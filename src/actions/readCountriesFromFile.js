import { READ_COUNTRIES_FROM_FILE } from '../constants';
import { readCountriesFromTizenFileSystem } from '../helpers/readAndWriteToFileSystem';

export const readCountriesFromFile = () => {
  return dispatch => {
    try {
      readCountriesFromTizenFileSystem(res => {
        dispatch({ type: READ_COUNTRIES_FROM_FILE, payload: res });
      });
    } catch (err) {
      console.log('error: ', err.message);
      dispatch({
        type: READ_COUNTRIES_FROM_FILE,
        payload: 'Ukraine,USA,Italy,Spain,Russia,Canada,Germany,France',
      });
    }
  };
};
