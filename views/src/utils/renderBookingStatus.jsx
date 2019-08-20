import React from "react";

const renderStatus = status => {
  switch (status) {
    case "PENDING":
      return <span className="text-warning font-weight-bold">Đang chờ</span>;
    case "FINISHED":
      return <span className="text-danger font-weight-bold">Kết Thúc</span>;
    case "OPENING":
      return <span className="text-success font-weight-bold">Đang Mở</span>;
    case "PLAYING":
      return <span className="text-warning font-weight-bold">Đang chơi</span>;

    default:
      return (
        <span className="text-warning font-weight-bold">Không Xác Định</span>
      );
  }
};

export default renderStatus;
