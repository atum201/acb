import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";

export const actLoginRequest = (username, password) => {
  return dispatch => {
    return callApiCms("admin/login", "POST", { username, password })
      .then(res => {
        dispatch(actLogin(true, res.data.token));
      })
      .catch(() => {
        dispatch(actLogin(false));
      });
  };
};

export const actLogin = (isLogin, token = "") => {
  return {
    type: Types.LOGIN,
    isLogin,
    token
  };
};
