import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";

export const actUpdateAdminRequest = (
  id,
  status,
  no_change,
  address,
  phone,
  name,
  email,
  roles
) => {
  return dispatch => {
    return callApiCms("admins/" + id, "PUT", {
      status,
      no_change,
      address,
      phone,
      name,
      email,
      roles
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã cập nhật Notification thành công!",
            confirmTo: "/quan-tri-vien"
          })
        );
      })
      .catch(res => {
        var message = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
        dispatch(
          actFetchResourceFail({
            message: message,
            confirmTo: "/sua-quan-tri-vien/" + id
          })
        );
      });
  };
};

export const actCreateAdminRequest = (
  status,
  roles,
  no_change,
  address,
  phone,
  name,
  email,
  password
) => {
  return dispatch => {
    return callApiCms("admins", "POST", {
      status,
      roles,
      no_change,
      address,
      phone,
      name,
      email,
      password
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã thêm Notification thành công!",
            confirmTo: "/quan-tri-vien"
          })
        );
      })
      .catch(res => {
        var message = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
        dispatch(
          actFetchResourceFail({
            message: message,
            confirmTo: "/them-quan-tri-vien"
          })
        );
      });
  };
};
export const actGetAdminByIDRequest = id => {
  return dispatch => {
    return callApiCms(`admins/` + id, "GET").then(res => {
      dispatch(actGetadminsByID(res));
    });
  };
};
export const actGetadminsByID = adminDetail => {
  return {
    type: Types.GET_ADMINBYID,
    adminDetail
  };
};
export const actGetListAdminRequest = () => {
  return dispatch => {
    return callApiCms(`admins`, "GET").then(res => {
      dispatch(actGetListAdmin(res));
    });
  };
};
export const actGetListAdmin = listAdmin => {
  return {
    type: Types.GET_LISTADMIN,
    listAdmin
  };
};
//getListRole
export const actGetListRoleRequest = () => {
  return dispatch => {
    return callApiCms(`admin-roles`, "GET").then(res => {
      dispatch(actGetListRole(res));
    });
  };
};
export const actGetListRole = listRole => {
  return {
    type: Types.GET_LISTROLE,
    listRole
  };
};
