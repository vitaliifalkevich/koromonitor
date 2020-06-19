import { combineReducers } from 'redux';
import globalStatistic from './globalStatistic';
import statisticByCountry from './statisticByCountry';
import effectedCountries from './effectedCountries';
import readCountriesFromFile from './readCountriesFromFile';
import statisticHistory from './statisticHistory';

export const reducers = combineReducers({
  globalStatistic,
  statisticByCountry,
  effectedCountries,
  countriesToFollow: readCountriesFromFile,
  statisticHistory,
});
