export function renderErrorSever(checkErrorSV) {
  switch (checkErrorSV) {
    case "ADMIN_NOT_FOUND":
      return "Không tìm thấy quản trị viên";
    case "USER_NOT_FOUND":
      return "Không tìm thấy người dùng";
    case "GAME_NOT_FOUND":
      return "Không tìm thấy trò chơi";
    case "INFO_NOT_FOUND":
      return "Không tìm thấy thông tin";
    case "QUESTION_NOT_FOUND":
      return "Không tìm thấy câu hỏi";
    case "STATUS_NOT_FOUND":
      return "Không tìm thấy trạng thái";
    case "RESULT_NOT_FOUND":
      return "Không tìm thấy kết quả";
    case "START_DATE_INVALID":
      return "Ngày bắt đầu không hợp lệ";
    case "GAME_ID_INVALID":
      return "Game_id không hợp lệ";
    case "TOKEN_INVALID":
      return localStorage.removeItem("access_token_admin");
    case "invalid token":
      return localStorage.removeItem("access_token_admin");
    case "jwt malformed":
      return (window.location.href = "/dang-nhap");
    case "jwt expired":
      return (window.location.href = "/dang-nhap");
    case "GAME_ID_IS_EXISTED":
      return "Game ID đã tồn tại";
    case "GAME_IS_OPENING":
      return "Game đang mở!";
    case "ORDINAL_NUMBER_IS_EXISTED":
      return "Số câu bị trùng";
    case "GAME_NOT_OPEN":
      return "Game chưa mở";
    case "GAME_IS_PLAYING":
      return "Game đang diễn ra!";
    case "GAME_FINISHED":
      return "Game đã kết thúc!";
    case "NOT_ENOUGH_10_QUESTIONS":
      return "Game không đủ 10 câu hỏi - Bật thất bại!";
    case "ALLOW_ONLY_10_QUESTIONS":
      return "Game chỉ cho phép 10 câu hỏi";
    case "ORDINAL_NUMBER_NOT_FROM_1_TO_10":
      return "không đủ số thứ tự";
    case "GAME_STATUS_MUST_BE_PENDING":
      return "Game đang diễn ra không được sửa thông tin";
    case "ANOTHER_GAME_IS_OPENING":
      return "Game khác đang được mở - Mở thất bại";
    case "WAIT_FOR_THE_ANSWER_MUST_BE_NUMBER":
      return "Thời gian chờ câu trả lời phải là số";
    default:
      return "Lỗi không xác định";
  }
}
