import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";
export const actUpdateEnterpriseRequest = (
  enterprise_id,
  name,
	user_id,
	icon,
	address,
	phone,
	email,
	status,
	introdution,
	createdAt
) => {
  return dispatch => {
    return callApiCms("enterprise/" + enterprise_id, "PUT", {
      
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã cập nhật Enterprise thành công!",
            confirmTo: "/admin-page/danh-sach-enterprise"
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
            confirmTo: "/admin-page/sua-enterprise/" + enterprise_id
          })
        );
      });
  };
};
//actCreateEnterpriseRequest
export const actCreateEnterpriseRequest = (name, user_id, icon, address, phone, email, status, introdution, createdAt) => {
  return dispatch => {
    return callApiCms("enterprise", "POST", {
      name,
			user_id,
			icon,
			address,
			phone,
			email,
			status,
			introdution,
			createdAt
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã thêm Enterprise thành công!",
            confirmTo: "/admin-page/danh-sach-enterprise"
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
            confirmTo: "/admin-page/them-enterprise"
          })
        );
      });
  };
};
//getListEnterpriseID
export const actGetListEnterpriseID = id => {
  return dispatch => {
    return callApiCms(`enterprise/detail/` + id, "GET").then(res => {
      dispatch(actGetListEnterpriseIDDp(res));
    });
  };
};
export const actGetListEnterpriseIDDp = enterpriseDetail => {
  return {
    type: Types.GET_ENTERPRISEBYID,
    enterpriseDetail
  };
};

//getListEnterprise
export const actGetListEnterprise = () => {
  return dispatch => {
    return callApiCms(`enterprise/list`, "GET").then(res => {
      dispatch(actGetListEnterpriseDp(res));
    });
  };
};
export const actGetListEnterpriseDp = listEnterprise => {
  return {
    type: Types.GET_LISTENTERPRISE,
    listEnterprise
  };
};

