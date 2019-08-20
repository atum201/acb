import * as Types from "./../variables/actionTypes";
var initialState = {
  isLogin: "",
  token: ""
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      state = {
        isLogin: action.isLogin,
        token: action.token
      };
      return state;
    default:
      return state;
  }
};

export default authentication;
