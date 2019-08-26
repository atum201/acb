import * as Types from "../variables/actionTypes";
var initialState = {
  listVideo: {},
  videoDetail: {}
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTVIDEO:
      return { ...state, listVideo: action.listVideo };
    case Types.GET_VIDEOBYID:
      return { ...state, videoDetail: action.videoDetail };
    case Types.DELETE_VIDEO:
      return {listVideo: state.listVideo.filter(x=>x.video_id !== action.video_id)};
    default:
      return state;
  }
};

export default videoReducer;
