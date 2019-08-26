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
    case Types.DELETE_BANNER:
      return {listBanner: state.listBanner.filter(x=>x.banner_id !== action.banner_id)};
    default:
      return state;
  }
};

export default bannerReducer;
