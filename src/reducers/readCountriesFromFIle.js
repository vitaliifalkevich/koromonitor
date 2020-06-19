import { READ_COUNTRIES_FROM_FILE, CHANGE_CURRENT_PAGE } from '../constants';

const initialState = {
  data: [],
  currentPage: 0,
};
const readCountriesFromFile = (state = initialState, action) => {
  switch (action.type) {
    case READ_COUNTRIES_FROM_FILE:
      let arrayFromString;
      try {
        arrayFromString = action.payload.split(',');
      } catch (e) {
        arrayFromString = [];
      }

      return { ...state, data: arrayFromString };
    case CHANGE_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default readCountriesFromFile;
