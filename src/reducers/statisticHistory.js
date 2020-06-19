import {
  START_STATISTIC_HISTORY,
  STATISTIC_HISTORY_RECEIVED,
  STATISTIC_HISTORY_ERROR,
} from '../constants';

const initialState = {
  isFetching: false,
  data: [],
  errorMsg: '',
};

const statisticHistory = (state = initialState, action) => {
  switch (action.type) {
    case START_STATISTIC_HISTORY:
      return {
        ...state,
        isFetching: true,
      };
    case STATISTIC_HISTORY_RECEIVED:
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
    case STATISTIC_HISTORY_ERROR:
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

export default statisticHistory;
