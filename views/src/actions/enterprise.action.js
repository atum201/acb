import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";
import HOST from "../constants/host";

export const actUpdateEnterpriseRequest = (
  enterprise_id,
  name, user_id, icon, address, phone, email, introdution, createdAt,
  file
) => {
  return dispatch => {
    if(file){
      return callApiCms('upload/image','POST',file,true)
        .then(res =>{          
          if(res.status == 200){
            // upload file thanh cong
            icon = HOST+res.data.image;
            return callApiCms("enterprise/" + enterprise_id, "PUT", {
              name, user_id, icon, address, phone, email, introdution, createdAt
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
          }else{
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
          }
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
    }else{
      return callApiCms("enterprise/" + enterprise_id, "PUT", {
        name, user_id, icon, address, phone, email, introdution, createdAt
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
    }    
    
  };
};
//actCreateEnterpriseRequest
export const actCreateEnterpriseRequest = (name, user_id, icon, address, phone, email, introdution, createdAt,file) => {
  return dispatch => {
    if(file){
      return callApiCms('upload/image','POST',file,true)
        .then(res =>{  
          
          if(res.status == 200){
            // upload file thanh cong
            icon = HOST+res.data.image;
            return callApiCms("enterprise", "POST", {
              name, user_id, icon, address, phone, email, introdution, createdAt
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
          }else{

          }
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
    }else{
      return callApiCms("enterprise", "POST", {
        name, user_id, icon, address, phone, email, introdution, createdAt
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
    }

    
  };
};
//getEnterpriseByID
export const actGetEnterpriseByID = enterprise_id => {
  return dispatch => {
    return callApiCms(`enterprise/` +enterprise_id, "GET").then(res => {
      dispatch(actGetEnterpriseIDDp(res));
    });
  };
};
export const actGetEnterpriseIDDp = enterpriseDetail => {
  return {
    type: Types.GET_ENTERPRISEBYID,
    enterpriseDetail
  };
};

//getListEnterprise
export const actGetListEnterprise = (query) => {
  return dispatch => {
    return callApiCms(`enterprise/list?${Object.keys(query).map(function(data){
        return `${data}=${query[data]}`;
    }).join('&')}`, "GET").then(res => {
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

export const actDeleteEnterpriseRequest = (enterprise_id) => {
  return dispatch => {
    return callApiCms("enterprise/delete/"+enterprise_id, "DELETE")
        .then(res => {
          dispatch(
            actFetchResourceFail({
              message: "Bạn đã xóa Enterprise thành công!",
              confirmTo: "/admin-page/danh-sach-enterprise"
            })
          );
          dispatch(actDeleteEnterpriseDp(enterprise_id));
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
              confirmTo: "/admin-page/danh-sach-enterprise"
            })
          );
        });    
  };
};

export const actDeleteEnterpriseDp = enterprise_id => {
  return {
    type: Types.DELETE_ENTERPRISE,
    enterprise_id
  };
};
