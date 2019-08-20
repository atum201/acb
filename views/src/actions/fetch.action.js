import * as Types from "../variables/actionTypes";

export const actResetFetchResource = () => {
  return dispatch => {
    dispatch({
      type: Types.RESET_FETCH_RESOURCE
    });
  };
};

export const actFetchResourceSuccess = data => {
  return dispatch => {
    dispatch({
      type: Types.FETCH_RESOURCES_SUCCESS,
      data
    });
  };
};

export const actFetchResourceFail = data => {
  return dispatch => {
    dispatch({
      type: Types.FETCH_RESOURCES_FAIL,
      data
    });
  };
};

export const actNotify = data => {
  return dispatch => {
    dispatch({
      type: Types.NOTIFY,
      data
    });
  };
};
