import * as Types from "../variables/actionTypes";
var initialState = {
  listRegister: {},
  registerDetail: {}
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTREGISTER:
      return { ...state, listRegister: action.listRegister };
    case Types.GET_REGISTERBYID:
      return { ...state, registerDetail: action.registerDetail };
    case Types.DELETE_REGISTER:
      return {listRegister: state.listRegister.filter(x=>x.register_id !== action.register_id)};
    default:
      return state;
  }
};

export default registerReducer;
