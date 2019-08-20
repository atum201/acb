import * as Types from "../variables/actionTypes";

var initialState = {
  fetchSuccess: null,
  fetchFail: null,
  notify: null
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.RESET_FETCH_RESOURCE:
      state = initialState;
      return state;
    case Types.FETCH_RESOURCES_SUCCESS:
      state = { ...state, fetchSuccess: action.data };
      return state;
    case Types.FETCH_RESOURCES_FAIL:
      state = { ...state, fetchFail: action.data };
      return state;
    case Types.NOTIFY:
      state = { ...state, notify: action.data };
      return state;
    default:
      return state;
  }
};

export default fetchReducer;
