import { CHANGE_CURRENT_PAGE } from '../constants';

export const changeCurrentPage = index => {
  return dispath => {
    dispath({ type: CHANGE_CURRENT_PAGE, payload: index });
  };
};
