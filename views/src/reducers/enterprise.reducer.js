import * as Types from "../variables/actionTypes";
var initialState = {
  listEnterprise: {},
  enterpriseDetail: {}
};

const enterpriseReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTENTERPRISE:
      return { ...state, listEnterprise: action.listEnterprise };
    case Types.GET_ENTERPRISEBYID:
      return { ...state, enterpriseDetail: action.enterpriseDetail };
    case Types.DELETE_ENTERPRISE:
      return {listEnterprise: state.listEnterprise.filter(x=>x.enterprise_id !== action.enterprise_id)};
    default:
      return state;
  }
};

export default enterpriseReducer;
