import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";
//getListUser
export const actGetListInfo = () => {
  return dispatch => {
    return callApiCms(`info/detail`, "GET").then(res => {
      dispatch(actGetListInfoDp(res));
    });
  };
};
export const actGetListInfoDp = listInfoSetup => {
  return {
    type: Types.GET_LISTINFO,
    listInfoSetup
  };
};
//update
export const actUpdateSetupInfo = (
  law,
  waitForTheNextQuestion,
  waitForTheAnswer
) => {
  return dispatch => {
    return callApiCms("info", "PUT", {
      law,
      waitForTheNextQuestion,
      waitForTheAnswer
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã cập nhật thông tin thành công!",
            confirmTo: "/admin-page/thong-tin-cai-dat"
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
            confirmTo: "/admin-page/thong-tin-cai-dat"
          })
        );
      });
  };
};
