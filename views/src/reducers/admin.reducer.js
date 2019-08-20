import * as Types from "../variables/actionTypes";
var initialState = {
  listAdmin: {},
  adminDetail: {
    admin: {
      roles: [{}]
    }
  },
  listRole: {}
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTADMIN:
      return { ...state, listAdmin: action.listAdmin };
    default:
      return state;
  }
};

export default adminReducer;
