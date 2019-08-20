import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import { actFetchResourceSuccess, actFetchResourceFail } from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";
export const actUpdateBannerRequest = (
  banner_id,
  name,
  code,
  link,
  img,
  createdAt
) => {
  return dispatch => {
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
  };
};
//actCreateBannerRequest
export const actCreateBannerRequest = (name, code, link, img, createdAt) => {
  return dispatch => {
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
  };
};
//getListBannerID
export const actGetListBannerID = id => {
  return dispatch => {
    return callApiCms(`banner/detail/` + id, "GET").then(res => {
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
      dispatch(actGetListBannerDp(res));
    });
  };
};
export const actGetListBannerDp = listBanner => {
  return {
    type: Types.GET_LISTBANNER,
    listBanner
  };
};
