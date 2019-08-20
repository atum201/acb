import React from "react";
import SweetAlert from "react-bootstrap-sweetalert/lib/dist/SweetAlert";
import PropsType from "prop-types";

const AlertSuccess = props => {
  return (
    <SweetAlert
      success
      style={{ display: "block" }}
      title={`Xin chúc mừng`}
      onConfirm={() => {
        props.resetFetchResource();
        // eslint-disable-next-line react/prop-types
        props.history.push(props.confirmTo);
      }}
      confirmBtnBsStyle="info"
    >
      {props.message}
    </SweetAlert>
  );
};

export default AlertSuccess;
AlertSuccess.propTypes = {
  confirmTo: PropsType.string,
  message: PropsType.string,
  resetFetchResource: PropsType.func
};
