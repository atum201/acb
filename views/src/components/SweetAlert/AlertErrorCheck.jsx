import React from "react";
import SweetAlert from "react-bootstrap-sweetalert/lib/dist/SweetAlert";
import PropsType from "prop-types";

const AlertErrorCheck = ({ confirmToFunc, message }) => {
  return (
    <SweetAlert
      warning
      style={{ display: "block" }}
      title={"Chờ đã"}
      confirmBtnText="Đồng ý"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="default"
      onConfirm={() => confirmToFunc()}
    >
      {message}
    </SweetAlert>
  );
};

export default AlertErrorCheck;
AlertErrorCheck.propTypes = {
  confirmToFunc: PropsType.func,
  cancleToFunc: PropsType.func,
  message: PropsType.string
};
