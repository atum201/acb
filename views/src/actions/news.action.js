import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";
import HOST from "../constants/host";

export const actUpdateNewsRequest = (
  news_id,
  enterprise_id, title, avatar, description, content, author, createdAt,
  file
) => {
  return dispatch => {
    if(file){
      return callApiCms('upload/image','POST',file,true)
        .then(res =>{          
          if(res.status == 200){
            // upload file thanh cong
            avatar = HOST+res.data.image;
            return callApiCms("news/" + news_id, "PUT", {
              enterprise_id, title, avatar, description, content, author, createdAt
            })
              .then(res => {
                dispatch(
                  actFetchResourceSuccess({
                    message: "Bạn đã cập nhật News thành công!",
                    confirmTo: "/admin-page/danh-sach-news"
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
                    confirmTo: "/admin-page/sua-news/" + news_id
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
                confirmTo: "/admin-page/sua-news/" + news_id
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
              confirmTo: "/admin-page/sua-news/" + news_id
            })
          );
        });
    }else{
      return callApiCms("news/" + news_id, "PUT", {
        enterprise_id, title, avatar, description, content, author, createdAt
      })
        .then(res => {
          dispatch(
            actFetchResourceSuccess({
              message: "Bạn đã cập nhật News thành công!",
              confirmTo: "/admin-page/danh-sach-news"
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
              confirmTo: "/admin-page/sua-news/" + news_id
            })
          );
        });
    }    
    
  };
};
//actCreateNewsRequest
export const actCreateNewsRequest = (enterprise_id, title, avatar, description, content, author, createdAt,file) => {
  return dispatch => {
    if(file){
      return callApiCms('upload/image','POST',file,true)
        .then(res =>{          
          if(res.status == 200){
            // upload file thanh cong
            avatar = HOST+res.data.image;
            return callApiCms("news", "POST", {
              enterprise_id, title, avatar, description, content, author, createdAt
            })
              .then(res => {
                dispatch(
                  actFetchResourceSuccess({
                    message: "Bạn đã thêm News thành công!",
                    confirmTo: "/admin-page/danh-sach-news"
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
                    confirmTo: "/admin-page/them-news"
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
              confirmTo: "/admin-page/them-news"
            })
          );
        });
    }else{
      return callApiCms("news", "POST", {
        enterprise_id, title, avatar, description, content, author, createdAt
      })
        .then(res => {
          dispatch(
            actFetchResourceSuccess({
              message: "Bạn đã thêm News thành công!",
              confirmTo: "/admin-page/danh-sach-news"
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
              confirmTo: "/admin-page/them-news"
            })
          );
        });
    }

    
  };
};
//getNewsByID
export const actGetNewsByID = news_id => {
  return dispatch => {
    return callApiCms(`news/` +news_id, "GET").then(res => {
      dispatch(actGetNewsIDDp(res));
    });
  };
};
export const actGetNewsIDDp = newsDetail => {
  return {
    type: Types.GET_NEWSBYID,
    newsDetail
  };
};

//getListNews
export const actGetListNews = () => {
  return dispatch => {
    return callApiCms(`news/list`, "GET").then(res => {
      dispatch(actGetListNewsDp(res.data.docs));
    });
  };
};
export const actGetListNewsDp = listNews => {
  return {
    type: Types.GET_LISTNEWS,
    listNews
  };
};

export const actDeleteNewsRequest = (news_id) => {
  return dispatch => {
    return callApiCms("news/delete/"+news_id, "DELETE")
        .then(res => {
          dispatch(
            actFetchResourceFail({
              message: "Bạn đã xóa News thành công!",
              confirmTo: "/admin-page/danh-sach-news"
            })
          );
          dispatch(actDeleteNewsDp(news_id));
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
              confirmTo: "/admin-page/danh-sach-news"
            })
          );
        });    
  };
};

export const actDeleteNewsDp = news_id => {
  return {
    type: Types.DELETE_NEWS,
    news_id
  };
};
