import * as Types from "../variables/actionTypes";
var initialState = {
  listAccount: {},
  accountDetail: {}
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTACCOUNT:
      return { ...state, listAccount: action.listAccount };
    case Types.GET_ACCOUNTBYID:
      return { ...state, accountDetail: action.accountDetail };
    case Types.DELETE_ACCOUNT:
      return {listAccount: state.listAccount.filter(x=>x.account_id !== action.account_id)};
    default:
      return state;
  }
};

export default accountReducer;
