import {
  START_STATISTIC_BY_COUNTRY,
  STATISTIC_BY_COUNTRY_RECEIVED,
  STATISTIC_BY_COUNTRY_ERROR,
} from '../constants';

const initialState = {
  isFetching: false,
  data: [],
  errorMsg: '',
};

const statisticByCountry = (state = initialState, action) => {
  switch (action.type) {
    case START_STATISTIC_BY_COUNTRY:
      return {
        ...state,
        isFetching: true,
      };
    case STATISTIC_BY_COUNTRY_RECEIVED:
      if (action.payload !== undefined) {
        return {
          ...state,
          isFetching: false,
          data: action.payload,
          errorMsg: '',
        };
      } else {
        return {
          ...state,
          isFetching: false,
        };
      }
    case STATISTIC_BY_COUNTRY_ERROR:
      return {
        ...state,
        isFetching: false,
        data: [],
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default statisticByCountry;
