import * as Types from "../variables/actionTypes";
var initialState = {
  listGame: {},
  gameDetail: {}
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTGAME:
      return { ...state, listGame: action.listGame };
    case Types.GET_GAMEBYID:
      return { ...state, gameDetail: action.gameDetail };
    default:
      return state;
  }
};

export default adminReducer;
