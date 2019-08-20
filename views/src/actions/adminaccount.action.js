import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
//getListUser
export const actGetListAccAdmin = () => {
  return dispatch => {
    return callApiCms(`admin/info`, "GET").then(res => {
      dispatch(actGetListAccAdminDp(res));
    });
  };
};
export const actGetListAccAdminDp = listAccAdmin => {
  return {
    type: Types.GET_LISTACCADMIN,
    listAccAdmin
  };
};
//update
export const actUpdateAccAdmin = (name, dateOfBirth, phone, address) => {
  return dispatch => {
    return callApiCms("admin", "PUT", {
      name,
      dateOfBirth,
      phone,
      address
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã cập nhật tài khoản thành công!",
            confirmTo: "/admin-page/quan-tri-vien"
          })
        );
      })
      .catch(res => {
        var message = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
        dispatch(
          actFetchResourceFail({
            message: message,
            confirmTo: "/admin-page/quan-tri-vien"
          })
        );
      });
  };
};
