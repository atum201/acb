import * as Types from "../variables/actionTypes";
var initialState = {
  listFact: {},
  factDetail: {}
};

const factReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTFACT:
      return { ...state, listFact: action.listFact };
    case Types.GET_FACTBYID:
      return { ...state, factDetail: action.factDetail };
    case Types.DELETE_FACT:
      return {listFact: state.listFact.filter(x=>x.fact_id !== action.fact_id)};
    default:
      return state;
  }
};

export default factReducer;
