import React from "react";
import SweetAlert from "react-bootstrap-sweetalert/lib/dist/SweetAlert";
import PropsType from "prop-types";

const AlertWarning = ({ confirmToFunc, cancleToFunc, message }) => {
  return (
    <SweetAlert
      warning
      style={{ display: "block" }}
      title={"Chờ đã"}
      showCancel
      confirmBtnText="Đồng ý"
      confirmBtnBsStyle="danger"
      cancelBtnText={"Hủy bỏ"}
      cancelBtnBsStyle="default"
      onConfirm={() => confirmToFunc()}
      onCancel={() => cancleToFunc()}
    >
      {message}
    </SweetAlert>
  );
};

export default AlertWarning;
AlertWarning.propTypes = {
  confirmToFunc: PropsType.func,
  cancleToFunc: PropsType.func,
  message: PropsType.string
};
