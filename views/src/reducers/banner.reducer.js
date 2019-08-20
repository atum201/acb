import * as Types from "../variables/actionTypes";
var initialState = {
  listBanner: {},
  bannerDetail: {}
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTBANNER:
      return { ...state, listBanner: action.listBanner };
    case Types.GET_BANNERBYID:
      return { ...state, bannerDetail: action.bannerDetail };
    default:
      return state;
  }
};

export default bannerReducer;
