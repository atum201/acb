import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";

export const actUpdateRegisterRequest = (
  register_id,
  event_id, fullname, mail, mobile, createdAt
) => {
  return dispatch => {
    return callApiCms("register/" + register_id, "PUT", {
      event_id, fullname, mail, mobile, createdAt
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã cập nhật Register thành công!",
            confirmTo: "/admin-page/danh-sach-register"
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
            confirmTo: "/admin-page/sua-register/" + register_id
          })
        );
      });
  };
};
//actCreateRegisterRequest
export const actCreateRegisterRequest = (event_id, fullname, mail, mobile, createdAt) => {
  return dispatch => {
    return callApiCms("register", "POST", {
      event_id, fullname, mail, mobile, createdAt
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã thêm Register thành công!",
            confirmTo: "/admin-page/danh-sach-register"
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
            confirmTo: "/admin-page/them-register"
          })
        );
      });
  };
};
//getRegisterByID
export const actGetRegisterByID = register_id => {
  return dispatch => {
    return callApiCms(`register/` +register_id, "GET").then(res => {
      dispatch(actGetRegisterIDDp(res));
    });
  };
};
export const actGetRegisterIDDp = registerDetail => {
  return {
    type: Types.GET_REGISTERBYID,
    registerDetail
  };
};

//getListRegister
export const actGetListRegister = () => {
  return dispatch => {
    return callApiCms(`register/list`, "GET").then(res => {
      dispatch(actGetListRegisterDp(res.data.docs));
    });
  };
};
export const actGetListRegisterDp = listRegister => {
  return {
    type: Types.GET_LISTREGISTER,
    listRegister
  };
};

export const actDeleteRegisterRequest = (register_id) => {
  return dispatch => {
    return callApiCms("register/delete/"+register_id, "DELETE")
        .then(res => {
          dispatch(
            actFetchResourceFail({
              message: "Bạn đã xóa Register thành công!",
              confirmTo: "/admin-page/danh-sach-register"
            })
          );
          dispatch(actDeleteRegisterDp(register_id));
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
              confirmTo: "/admin-page/danh-sach-register"
            })
          );
        });    
  };
};

export const actDeleteRegisterDp = register_id => {
  return {
    type: Types.DELETE_REGISTER,
    register_id
  };
};
