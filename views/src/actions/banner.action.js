import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApi";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";
import HOST from "../constants/host";
export const actUpdateBannerRequest = (
  banner_id,
  name,
  code,
  link,
  img,
  createdAt,
  file
) => {
  return dispatch => {
    if(file){
      return callApiCms('upload/image','POST',file,true)
        .then(res =>{          
          if(res.status == 200){
            // upload file thanh cong
            img = HOST+res.data.image;
            return callApiCms("banner/" + banner_id, "PUT", {
              name,
              code,
              link,
              img,
              createdAt
            })
            .then(res => {
              dispatch(
                actFetchResourceSuccess({
                  message: "Bạn đã cập nhật Banner thành công!",
                  confirmTo: "/admin-page/danh-sach-banner"
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
                  confirmTo: "/admin-page/sua-banner/" + banner_id
                })
              );
            });
          }else{
            var message = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
            dispatch(
              actFetchResourceFail({
                message: message,
                confirmTo: "/admin-page/sua-banner/" + banner_id
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
              confirmTo: "/admin-page/sua-banner/" + banner_id
            })
          );
        });
    }else{
      return callApiCms("banner/" + banner_id, "PUT", {
        name,
        code,
        link,
        img,
        createdAt
      })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã cập nhật Banner thành công!",
            confirmTo: "/admin-page/danh-sach-banner"
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
            confirmTo: "/admin-page/sua-banner/" + banner_id
          })
        );
      });
    }

    
  };
};
//actCreateBannerRequest
export const actCreateBannerRequest = (name, code, link, img, createdAt,file) => {
  console.log(file)

  return dispatch => {
    if(file){
      // upload file
      return callApiCms('upload/image','POST',file,true)
        .then(res =>{          
          if(res.status == 200){
            // upload file thanh cong
            img = HOST+res.data.image;
            return callApiCms("banner", "POST", {
              name,
              code,
              link,
              img,
              createdAt
            })
              .then(res => {
                dispatch(
                  actFetchResourceSuccess({
                    message: "Bạn đã thêm Banner thành công!",
                    confirmTo: "/admin-page/danh-sach-banner"
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
                    confirmTo: "/admin-page/them-banner"
                  })
                );
              });
          }else{
            var messagec = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
            dispatch(
              actFetchResourceFail({
                message: messagec,
                confirmTo: "/admin-page/them-banner"
              })
            );
          }
          
          
        }).catch(res =>{
          console.log(res);
          const error = res.response.data;
          var messagec = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
          if (error) {
            messagec = renderErrorSever(error.message);
          }
          dispatch(
            actFetchResourceFail({
              message: messagec,
              confirmTo: "/admin-page/them-banner"
            })
          );
        }) 
    }else{
      return callApiCms("banner", "POST", {
        name,
        code,
        link,
        img,
        createdAt
      })
        .then(res => {
          dispatch(
            actFetchResourceSuccess({
              message: "Bạn đã thêm Banner thành công!",
              confirmTo: "/admin-page/danh-sach-banner"
            })
          );
        })
        .catch(res => {
          console.log(res);
          const error = res.response.data;
          var messagec = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
          if (error) {
            messagec = renderErrorSever(error.message);
          }
          dispatch(
            actFetchResourceFail({
              message: messagec,
              confirmTo: "/admin-page/them-banner"
            })
          );
        });
    }
     
    
  };
};
//getListBannerID
export const actGetListBannerID = id => {
  console.log("actGetListBannerID", id)
  return dispatch => {
    return callApiCms(`banner/` + id, "GET").then(res => {
      console.log(res);
      dispatch(actGetListBannerIDDp(res));
    });
  };
};
export const actGetListBannerIDDp = bannerDetail => {
  return {
    type: Types.GET_BANNERBYID,
    bannerDetail
  };
};

//getListBanner
export const actGetListBanner = () => {
  return dispatch => {
    return callApiCms(`banner/list`, "GET").then(res => {
      dispatch(actGetListBannerDp(res.data.docs));
    });
  };
};
export const actGetListBannerDp = listBanner => {
  return {
    type: Types.GET_LISTBANNER,
    listBanner
  };
};

export const actDeleteBannerRequest = (banner_id) => {
  return dispatch => {
    console.log("delete:",banner_id)
    return callApiCms("banner/delete/"+banner_id, "DELETE")
        .then(res => {
          console.log("delete:", res)
          dispatch(
            actFetchResourceFail({
              message: "Bạn đã xóa Banner thành công!",
              confirmTo: "/admin-page/danh-sach-banner"
            })
          );
          dispatch(actDeleteBannerDp(banner_id));
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
              confirmTo: "/admin-page/danh-sach-banner"
            })
          );
        });
    
  };
};

export const actDeleteBannerDp = banner_id => {
  return {
    type: Types.DELETE_BANNER,
    banner_id
  };
};