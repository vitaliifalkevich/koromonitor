export const API_KEY = '2e26761eacmsha0de99974e9b625p1c649cjsn5df2e645c30d';
export const RAPID_HOST = 'coronavirus-monitor.p.rapidapi.com';

/*Addresses for fetching*/
export const URL_GET_GLOBAL_STATISTIC =
  'https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php';
export const URL_GET_STATISTIC_BY_COUNTRY =
  'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php';
export const URL_GET_EFFECTED_COUNTRIES =
  'https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php';
export const URL_GET_STATISTIC_HISTORY =
  'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php';

/*States for async actions*/
export const GLOBAL_STATISTIC_RECEIVED = 'GLOBAL_STATISTIC_RECEIVED';
export const START_GLOBAL_STATISTIC = 'START_GLOBAL_STATISTIC';
export const GLOBAL_STATISTIC_ERROR = 'GLOBAL_STATISTIC_ERROR';

export const STATISTIC_BY_COUNTRY_RECEIVED = 'STATISTIC_BY_COUNTRY_RECEIVED';
export const START_STATISTIC_BY_COUNTRY = 'START_STATISTIC_BY_COUNTRY';
export const STATISTIC_BY_COUNTRY_ERROR = 'STATISTIC_BY_COUNTRY_ERROR';

export const STATISTIC_HISTORY_RECEIVED = 'STATISTIC_HISTORY_RECEIVED';
export const START_STATISTIC_HISTORY = 'START_STATISTIC_HISTORY';
export const STATISTIC_HISTORY_ERROR = 'STATISTIC_HISTORY_ERROR';

export const EFFECTED_COUNTRIES_RECEIVED = 'EFFECTED_COUNTRIES_RECEIVED';
export const START_EFFECTED_COUNTRIES = 'START_EFFECTED_COUNTRIES';
export const EFFECTED_COUNTRIES_ERROR = 'EFFECTED_COUNTRIES_ERROR';

export const FOLLOW_UNFOLLOW_COUNTRY = 'FOLLOW_UNFOLLOW_COUNTRY';
export const CHANGE_CHECK_STATUS_COUNTRY = 'CHANGE_CHECK_STATUS_COUNTRY';
export const READ_COUNTRIES_FROM_FILE = 'READ_COUNTRIES_FROM_FILE';

export const LIMIT_REQUEST_TIME = 300;
export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

/*Icons types*/
export const iconTypes = {
  settings: 'settings',
  statistic: 'statistic',
  trash: 'trash',
  back: 'back',
};
/*Buttons types*/
export const btnTypes = {
  follow: 'follow',
  unfollow: 'unfollow',
  back: 'back',
  next: 'next',
  prev: 'prev',
};

/*Errors*/

export const ERRORS = {
  ERROR_DATA_FETCHING: {
    className: 'error-data-fetching',
    message: 'Press Double tap to reload application.',
  },
};

/*TIZEN FILES CONSTANTS*/

export const APP_DIR_NAME = 'coromonitor';
export const CHOSEN_COUNTRIES = 'chosenCountries';
