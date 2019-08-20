import * as Types from "../variables/actionTypes";
var initialState = {
  listAccAdmin: {}
};

const AccAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTACCADMIN:
      return { ...state, listAccAdmin: action.listAccAdmin };

    default:
      return state;
  }
};

export default AccAdminReducer;
