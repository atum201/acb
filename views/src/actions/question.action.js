import * as Types from "../variables/actionTypes";
import callApiCms from "./../utils/callApiCms";
import {
  actFetchResourceSuccess,
  actFetchResourceFail,
  actNotify
} from "./fetch.action";
import { renderErrorSever } from "../utils/renderError";
const form_data = true;
export const actUpdateQuestionRequest = (
  id,
  game_id,
  ordinalNumber,
  title,
  answerA,
  answerB,
  answerC,
  answerD,
  explain,
  rightAnswer
) => {
  return dispatch => {
    return callApiCms("question/" + id, "PUT", {
      game_id,
      ordinalNumber,
      title,
      answerA,
      answerB,
      answerC,
      answerD,
      explain,
      rightAnswer
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã cập nhật câu hỏi thành công!",
            confirmTo: "/admin-page/danh-sach-cau-hoi/" + game_id
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
            confirmTo: "/admin-page/sua-cau-hoi/" + id
          })
        );
      });
  };
};
//actCreateGameRequest
export const actCreateQuestionRequest = (
  game_id,
  ordinalNumber,
  title,
  answerA,
  answerB,
  answerC,
  answerD,
  explain,
  rightAnswer
) => {
  return dispatch => {
    return callApiCms("question", "POST", {
      game_id,
      ordinalNumber,
      title,
      answerA,
      answerB,
      answerC,
      answerD,
      explain,
      rightAnswer
    })
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã thêm câu hỏi thành công!",
            confirmTo: "/admin-page/danh-sach-cau-hoi/" + game_id
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
            confirmTo: "/admin-page/danh-sach-cau-hoi/" + game_id
          })
        );
      });
  };
};
//getListGameID
export const actGetListQuestionID = id => {
  return dispatch => {
    return callApiCms(`question/detail/` + id, "GET").then(res => {
      dispatch(actGetListQuestionIDDp(res));
    });
  };
};
export const actGetListQuestionIDDp = questionDetail => {
  return {
    type: Types.GET_QUESTIONBYID,
    questionDetail
  };
};

//getListGame
export const actGetListQuestion = id => {
  return dispatch => {
    return callApiCms(`question/list/` + id, "GET").then(res => {
      dispatch(actGetListGameDp(res));
    });
  };
};
export const actGetListGameDp = listQuestion => {
  return {
    type: Types.GET_LISTQUESTIOB,
    listQuestion
  };
};
//remove

export const actRemoveQuestion = (id, game_id) => {
  return dispatch => {
    return callApiCms(`question/${id}`, "DELETE")
      .then(res => {
        dispatch(
          actFetchResourceSuccess({
            message: "Bạn đã xóa câu hỏi thành công!",
            confirmTo: "/admin-page/danh-sach-cau-hoi/" + game_id
          })
        );
        dispatch(actGetListQuestion(game_id));
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
            confirmTo: "/admin-page/danh-sach-cau-hoi/" + game_id
          })
        );
      });
  };
};
//getQuestion
export const actGetInfoGame = id => {
  return dispatch => {
    return callApiCms(`game/detail/` + id, "GET").then(res => {
      dispatch(actGetInfoGameDp(res));
    });
  };
};
export const actGetInfoGameDp = infoGame => {
  return {
    type: Types.GET_LISTINFOGAME,
    infoGame
  };
};

// importexcel
export const actImportExcelRequest = (data, game_id) => {
  return dispatch => {
    const notify_data = {
      message: "Đang tiến hành upload file, vui lòng chờ trong giây lát...",
      color: "info"
    };
    dispatch(actNotify(notify_data));
    return callApiCms("question/import-excel", "POST", data, form_data)
      .then(res => {
        if (res.data.success) {
          let notify_data = {
            message:
              "Import file thành công! Dữ liệu đang được đồng bộ hóa, vui lòng chờ trong giây lát!",
            color: "primary"
          };
          dispatch(actNotify(notify_data));
          dispatch(actGetListQuestion(game_id));
        } else {
          let notify_data = {
            message:
              "Import file thất bại! lỗi không xác định vui lòng thử lại!",
            color: "danger"
          };
          dispatch(actNotify(notify_data));
        }
        // dispatch(actGetUsersRequest());
      })
      .catch(res => {
        if (res.response && Array.isArray(res.response.data.message.message)) {
          if (res.response.data.message) {
            let arrMessage = res.response.data.message.message;
            for (var i = 0; i < arrMessage.length; i++) {
              let notify_data = {
                message:
                  "Import không thành công Câu: " +
                  arrMessage[i].Number +
                  " " +
                  arrMessage[i].Message,
                color: "primary"
              };
              dispatch(actNotify(notify_data));
              dispatch(actGetListQuestion(game_id));
            }
          } else {
            const notify_data = {
              message:
                "Import file thất bại! Dữ liệu import bị trùng ID hoặc không hợp lệ, vui lòng thử lại sau.",
              color: "danger"
            };
            dispatch(actNotify(notify_data));
          }
        } else {
          let error = res.response
            ? res.response.data
            : "Đã có lỗi xảy ra xin vui lòng thử lại sau";
          var messagec = "Đã có lỗi xảy ra xin vui lòng thử lại sau";
          messagec = renderErrorSever(error.message);
          return dispatch(
            actFetchResourceFail({
              message: messagec,
              confirmTo: "/admin-page/danh-sach-cau-hoi/" + game_id
            })
          );
        }
      });
  };
};
