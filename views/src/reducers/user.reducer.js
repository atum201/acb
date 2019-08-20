import * as Types from "../variables/actionTypes";
var initialState = {
  listUSER: {},
  listGameUser: {},
  userDetail: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTUSER:
      return { ...state, listUSER: action.listUSER };
    case Types.GET_LISTGAMEUSER:
      return { ...state, listGameUser: action.listGameUser };
    case Types.GET_USERBYID:
      return { ...state, userDetail: action.userDetail };

    default:
      return state;
  }
};

export default userReducer;
