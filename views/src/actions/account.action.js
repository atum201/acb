import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";

export const actUpdateAccountRequest = (
  account_id,
  account, password, role, fullname, mail, mobile, createdAt
) => {
  return dispatch => {
    return callApiCms("account/" + account_id, "PUT", {
      account, password, role, fullname, mail, mobile, createdAt
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã cập nhật Account thành công!",
            confirmTo: "/admin-page/danh-sach-account"
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
            confirmTo: "/admin-page/sua-account/" + account_id
          })
        );
      });
  };
};
//actCreateAccountRequest
export const actCreateAccountRequest = (account, password, role, fullname, mail, mobile, createdAt) => {
  return dispatch => {
    return callApiCms("account", "POST", {
      account, password, role, fullname, mail, mobile, createdAt
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã thêm Account thành công!",
            confirmTo: "/admin-page/danh-sach-account"
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
            confirmTo: "/admin-page/them-account"
          })
        );
      });
  };
};
//getAccountByID
export const actGetAccountByID = account_id => {
  return dispatch => {
    return callApiCms(`account/` +account_id, "GET").then(res => {
      dispatch(actGetAccountIDDp(res));
    });
  };
};
export const actGetAccountIDDp = accountDetail => {
  return {
    type: Types.GET_ACCOUNTBYID,
    accountDetail
  };
};

//getListAccount
export const actGetListAccount = () => {
  return dispatch => {
    return callApiCms(`account/list`, "GET").then(res => {
      dispatch(actGetListAccountDp(res.data.docs));
    });
  };
};
export const actGetListAccountDp = listAccount => {
  return {
    type: Types.GET_LISTACCOUNT,
    listAccount
  };
};

export const actDeleteAccountRequest = (account_id) => {
  return dispatch => {
    return callApiCms("account/delete/"+account_id, "DELETE")
        .then(res => {
          dispatch(
            actFetchResourceFail({
              message: "Bạn đã xóa Account thành công!",
              confirmTo: "/admin-page/danh-sach-account"
            })
          );
          dispatch(actDeleteAccountDp(account_id));
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
              confirmTo: "/admin-page/danh-sach-account"
            })
          );
        });    
  };
};

export const actDeleteAccountDp = account_id => {
  return {
    type: Types.DELETE_ACCOUNT,
    account_id
  };
};
