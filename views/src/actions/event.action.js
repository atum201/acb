import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";
import HOST from "../constants/host";

export const actUpdateEventRequest = (
  event_id,
  name, avatar, description, start_register, end_register, start_date, end_date, createdAt,
  file
) => {
  return dispatch => {
    if(file){
      return callApiCms('upload/image','POST',file,true)
        .then(res =>{          
          if(res.status == 200){
            // upload file thanh cong
            avatar = HOST+res.data.image;
            return callApiCms("event/" + event_id, "PUT", {
              name, avatar, description, start_register, end_register, start_date, end_date, createdAt
            })
              .then(res => {
                dispatch(
                  actFetchResourceSuccess({
                    message: "Bạn đã cập nhật Event thành công!",
                    confirmTo: "/admin-page/danh-sach-event"
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
                    confirmTo: "/admin-page/sua-event/" + event_id
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
                confirmTo: "/admin-page/sua-event/" + event_id
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
              confirmTo: "/admin-page/sua-event/" + event_id
            })
          );
        });
    }else{
      return callApiCms("event/" + event_id, "PUT", {
        name, avatar, description, start_register, end_register, start_date, end_date, createdAt
      })
        .then(res => {
          dispatch(
            actFetchResourceSuccess({
              message: "Bạn đã cập nhật Event thành công!",
              confirmTo: "/admin-page/danh-sach-event"
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
              confirmTo: "/admin-page/sua-event/" + event_id
            })
          );
        });
    }    
    
  };
};
//actCreateEventRequest
export const actCreateEventRequest = (name, avatar, description, start_register, end_register, start_date, end_date, createdAt,file) => {
  return dispatch => {
    if(file){
      return callApiCms('upload/image','POST',file,true)
        .then(res =>{          
          if(res.status == 200){
            // upload file thanh cong
            avatar = HOST+res.data.image;
            return callApiCms("event", "POST", {
              name, avatar, description, start_register, end_register, start_date, end_date, createdAt
            })
              .then(res => {
                dispatch(
                  actFetchResourceSuccess({
                    message: "Bạn đã thêm Event thành công!",
                    confirmTo: "/admin-page/danh-sach-event"
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
                    confirmTo: "/admin-page/them-event"
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
              confirmTo: "/admin-page/them-event"
            })
          );
        });
    }else{
      return callApiCms("event", "POST", {
        name, avatar, description, start_register, end_register, start_date, end_date, createdAt
      })
        .then(res => {
          dispatch(
            actFetchResourceSuccess({
              message: "Bạn đã thêm Event thành công!",
              confirmTo: "/admin-page/danh-sach-event"
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
              confirmTo: "/admin-page/them-event"
            })
          );
        });
    }

    
  };
};
//getEventByID
export const actGetEventByID = event_id => {
  return dispatch => {
    return callApiCms(`event/` +event_id, "GET").then(res => {
      dispatch(actGetEventIDDp(res));
    });
  };
};
export const actGetEventIDDp = eventDetail => {
  return {
    type: Types.GET_EVENTBYID,
    eventDetail
  };
};

//getListEvent
export const actGetListEvent = (query) => {
  return dispatch => {
    return callApiCms(`event/list?${Object.keys(query).map(function(data){
        return `${data}=${query[data]}`;
    }).join('&')}`, "GET").then(res => {
      dispatch(actGetListEventDp(res));
    });
  };
};
export const actGetListEventDp = listEvent => {
  return {
    type: Types.GET_LISTEVENT,
    listEvent
  };
};

export const actDeleteEventRequest = (event_id) => {
  return dispatch => {
    return callApiCms("event/delete/"+event_id, "DELETE")
        .then(res => {
          dispatch(
            actFetchResourceFail({
              message: "Bạn đã xóa Event thành công!",
              confirmTo: "/admin-page/danh-sach-event"
            })
          );
          dispatch(actDeleteEventDp(event_id));
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
              confirmTo: "/admin-page/danh-sach-event"
            })
          );
        });    
  };
};

export const actDeleteEventDp = event_id => {
  return {
    type: Types.DELETE_EVENT,
    event_id
  };
};
