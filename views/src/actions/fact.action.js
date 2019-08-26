import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";
import HOST from "../constants/host";

export const actUpdateFactRequest = (
  fact_id,
  name, number, description, createdAt,
  file
) => {
  return dispatch => {
    if(file){
      return callApiCms('upload/image','POST',file,true)
        .then(res =>{          
          if(res.status == 200){
            // upload file thanh cong
             = HOST+res.data.image;
            return callApiCms("fact/" + fact_id, "PUT", {
              name, number, description, createdAt
            })
              .then(res => {
                dispatch(
                  actFetchResourceSuccess({
                    message: "Bạn đã cập nhật Fact thành công!",
                    confirmTo: "/admin-page/danh-sach-fact"
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
                    confirmTo: "/admin-page/sua-fact/" + fact_id
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
                confirmTo: "/admin-page/sua-fact/" + fact_id
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
              confirmTo: "/admin-page/sua-fact/" + fact_id
            })
          );
        });
    }else{
      return callApiCms("fact/" + fact_id, "PUT", {
        name, number, description, createdAt
      })
        .then(res => {
          dispatch(
            actFetchResourceSuccess({
              message: "Bạn đã cập nhật Fact thành công!",
              confirmTo: "/admin-page/danh-sach-fact"
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
              confirmTo: "/admin-page/sua-fact/" + fact_id
            })
          );
        });
    }    
    
  };
};
//actCreateFactRequest
export const actCreateFactRequest = (name, number, description, createdAt,file) => {
  return dispatch => {
    if(file){
      return callApiCms('upload/image','POST',file,true)
        .then(res =>{          
          if(res.status == 200){
            // upload file thanh cong
            = HOST+res.data.image;
            return callApiCms("fact", "POST", {
              name, number, description, createdAt
            })
              .then(res => {
                dispatch(
                  actFetchResourceSuccess({
                    message: "Bạn đã thêm Fact thành công!",
                    confirmTo: "/admin-page/danh-sach-fact"
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
                    confirmTo: "/admin-page/them-fact"
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
              confirmTo: "/admin-page/them-fact"
            })
          );
        });
    }else{
      return callApiCms("fact", "POST", {
        name, number, description, createdAt
      })
        .then(res => {
          dispatch(
            actFetchResourceSuccess({
              message: "Bạn đã thêm Fact thành công!",
              confirmTo: "/admin-page/danh-sach-fact"
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
              confirmTo: "/admin-page/them-fact"
            })
          );
        });
    }

    
  };
};
//getFactByID
export const actGetFactByID = fact_id => {
  return dispatch => {
    return callApiCms(`fact/` +fact_id, "GET").then(res => {
      dispatch(actGetFactIDDp(res));
    });
  };
};
export const actGetFactIDDp = factDetail => {
  return {
    type: Types.GET_FACTBYID,
    factDetail
  };
};

//getListFact
export const actGetListFact = () => {
  return dispatch => {
    return callApiCms(`fact/list`, "GET").then(res => {
      dispatch(actGetListFactDp(res.data.docs));
    });
  };
};
export const actGetListFactDp = listFact => {
  return {
    type: Types.GET_LISTFACT,
    listFact
  };
};

export const actDeleteFactRequest = (fact_id) => {
  return dispatch => {
    return callApiCms("fact/delete/"+fact_id, "DELETE")
        .then(res => {
          dispatch(
            actFetchResourceFail({
              message: "Bạn đã xóa Fact thành công!",
              confirmTo: "/admin-page/danh-sach-fact"
            })
          );
          dispatch(actDeleteFactDp(fact_id));
        })
        .catch(res => {
          var messagec = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
          if (error) {
            messagec = renderErrorSever(error.message);
          }
          dispatch(
            actFetchResourceFail({
              message: messagec,
              confirmTo: "/admin-page/danh-sach-fact"
            })
          );
        });    
  };
};

export const actDeleteFactDp = fact_id => {
  return {
    type: Types.DELETE_FACT,
    fact_id
  };
};
