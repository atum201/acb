import * as Types from "../variables/actionTypes";
var initialState = {
  listInfoSetup: {}
};

const InfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTINFO:
      return { ...state, listInfoSetup: action.listInfoSetup };

    default:
      return state;
  }
};

export default InfoReducer;
