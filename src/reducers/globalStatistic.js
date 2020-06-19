import {
  START_GLOBAL_STATISTIC,
  GLOBAL_STATISTIC_RECEIVED,
  GLOBAL_STATISTIC_ERROR,
} from '../constants';

let initialState = {
  isFetching: false,
  data: [],
  errorMsg: '',
};

const globalStatistic = (state = initialState, action) => {
  switch (action.type) {
    case START_GLOBAL_STATISTIC:
      return {
        ...state,
        isFetching: true,
      };
    case GLOBAL_STATISTIC_RECEIVED:
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

    case GLOBAL_STATISTIC_ERROR:
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

export default globalStatistic;
