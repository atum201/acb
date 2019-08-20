import React from "react";
import SweetAlert from "react-bootstrap-sweetalert/lib/dist/SweetAlert";
import PropsType from "prop-types";

const AlertError = props => {
  return (
    <SweetAlert
      error
      style={{ display: "block" }}
      title={`Xin lỗi`}
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

export default AlertError;
AlertError.propTypes = {
  confirmTo: PropsType.string,
  message: PropsType.string,
  resetFetchResource: PropsType.func
};
