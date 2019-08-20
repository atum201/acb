import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

class LogoutPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <SweetAlert
          warning
          style={{ display: "block" }}
          title={`Đăng Xuất`}
          showCancel
          confirmBtnText="Đăng Xuất"
          confirmBtnBsStyle="danger"
          cancelBtnText={"Quay Lại"}
          cancelBtnBsStyle="default"
          onConfirm={() => {
            localStorage.removeItem("access_token_admin");
            // this.props.history.push("dang-nhap");
            window.location.replace("/dang-nhap")
          }}
          onCancel={() =>
            this.props.history.push("admin-page/danh-sach-tro-choi")
          }
        >
          Bạn có chắc muốn đăng xuất khỏi ABC IQ?
        </SweetAlert>
      </div>
    );
  }
}

LogoutPage.propTypes = {};
LogoutPage.defaultProps = {};

export default LogoutPage;
