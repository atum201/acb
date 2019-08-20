import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";

//getListUser
export const actGetListUser = (user_id, game_id, status, page = 1) => {
  return dispatch => {
    return callApiCms(
      `user/getList?game_id=` +
        game_id +
        "&status=" +
        status +
        "&user_id=" +
        user_id +
        "&page=" +
        page,
      // `user/getList/`,
      "GET"
    ).then(res => {
      dispatch(actGetListUserDp(res));
    });
  };
};
export const actGetListUserDp = listUSER => {
  return {
    type: Types.GET_LISTUSER,
    listUSER
  };
};
//getDetailUSerID
export const actgetDetailUSerID = id => {
  return dispatch => {
    return callApiCms(`user/getDetail/` + id, "GET").then(res => {
      dispatch(getDetailUSerIDDp(res));
    });
  };
};
export const getDetailUSerIDDp = userDetail => {
  return {
    type: Types.GET_USERBYID,
    userDetail
  };
};
//getListGame
export const actGetListGame = () => {
  return dispatch => {
    return callApiCms(`game/result/?status=FINISHED`, "GET").then(res => {
      dispatch(actGetListGameDP(res));
    });
  };
};
export const actGetListGameDP = listGameUser => {
  return {
    type: Types.GET_LISTGAMEUSER,
    listGameUser
  };
};
