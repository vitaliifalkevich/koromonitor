import {
  START_EFFECTED_COUNTRIES,
  EFFECTED_COUNTRIES_RECEIVED,
  EFFECTED_COUNTRIES_ERROR,
  CHANGE_CHECK_STATUS_COUNTRY,
} from '../constants';

let initialState = {
  isFetching: false,
  data: [],
  errorMsg: '',
  countChosenCountries: 0,
};

const effectedCountries = (state = initialState, action) => {
  let countChosenCountries;
  switch (action.type) {
    case START_EFFECTED_COUNTRIES:
      return {
        ...state,
        isFetching: true,
        data: [],
        errorMsg: '',
      };
    case EFFECTED_COUNTRIES_RECEIVED:
      countChosenCountries = action.payload.filter(item => {
        return item.checkStatus === true;
      });
      countChosenCountries = countChosenCountries.length;
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        errorMsg: '',
        countChosenCountries,
      };
    case CHANGE_CHECK_STATUS_COUNTRY:
      let newData = state.data.map(item => {
        if (item.country === action.payload.countryName) {
          return {
            ...item,
            checkStatus: action.payload.isChecked,
          };
        } else return item;
      });
      countChosenCountries = newData.filter(item => {
        return item.checkStatus === true;
      });
      countChosenCountries = countChosenCountries.length;
      return {
        ...state,
        data: newData,
        countChosenCountries,
      };
    case EFFECTED_COUNTRIES_ERROR:
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

export default effectedCountries;
