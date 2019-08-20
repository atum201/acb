import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";
export const actUpdateGameRequest = (
  id,
  name,
  bonus,
  recommend,
  start_date
) => {
  return dispatch => {
    return callApiCms("game/" + id, "PUT", {
      name,
      bonus,
      recommend,
      start_date
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã cập nhật Game thành công!",
            confirmTo: "/admin-page/danh-sach-tro-choi"
          })
        );
      })
      .catch(res => {
        const error = res.response.data;
        var message = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
        if (error) {
          message = renderErrorSever(error.message);
        }
        dispatch(
          actFetchResourceFail({
            message: message,
            confirmTo: "/admin-page/sua-tro-choi/" + id
          })
        );
      });
  };
};
//actCreateGameRequest
export const actCreateGameRequest = (name, bonus, recommend, start_date) => {
  return dispatch => {
    return callApiCms("game", "POST", {
      name,
      bonus,
      recommend,
      start_date
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã thêm Game thành công!",
            confirmTo: "/admin-page/danh-sach-tro-choi"
          })
        );
      })
      .catch(res => {
        const error = res.response.data;
        var messagec = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
        if (error) {
          messagec = renderErrorSever(error.message);
        }
        dispatch(
          actFetchResourceFail({
            message: messagec,
            confirmTo: "/admin-page/them-tro-choi"
          })
        );
      });
  };
};
//getListGameID
export const actGetListGameID = id => {
  return dispatch => {
    return callApiCms(`game/detail/` + id, "GET").then(res => {
      dispatch(actGetListGameIDDp(res));
    });
  };
};
export const actGetListGameIDDp = gameDetail => {
  return {
    type: Types.GET_GAMEBYID,
    gameDetail
  };
};

//getListGame
export const actGetListGame = () => {
  return dispatch => {
    return callApiCms(`game/result`, "GET").then(res => {
      dispatch(actGetListGameDp(res));
    });
  };
};
export const actGetListGameDp = listGame => {
  return {
    type: Types.GET_LISTGAME,
    listGame
  };
};
