import { CHANGE_CHECK_STATUS_COUNTRY } from '../constants';

export const changeCheckStatusCountry = (countryName, isChecked) => {
  return dispatch => {
    dispatch({
      type: CHANGE_CHECK_STATUS_COUNTRY,
      payload: { countryName, isChecked },
    });
  };
};
