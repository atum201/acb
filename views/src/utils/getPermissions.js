import React from "react";
import axios from "axios/index";
import { deleteCookie, getCookie } from "./cookies";
import HOST from "../variables/host";
import SweetAlert from "react-bootstrap-sweetalert";

export const getPermissionById = (prefix, that) => {
  const seft = that;
  axios({
    method: "GET",
    url: HOST + "/api/me",
    headers: { access_token: getCookie("access_token") }
  })
    .then(function(res) {
      res.data.roles.forEach(role => {
        axios({
          method: "GET",
          url: HOST + "/api/permissions/by-role/" + role._id,
          headers: { access_token: getCookie("access_token") }
        })
          .then(function(res) {
            const permissionsState = seft.state.permissions;
            var permissions = res.data;
            permissions = permissions.filter(permission => {
              if (
                !permissionsState.includes(permission) &&
                permission.slice(permission.indexOf("_") + 1) === prefix
              ) {
                return permission;
              }
            });
            const myPermissions =
              permissions.length > 0
                ? permissionsState.concat(
                    permissions.map(permission => {
                      return permission.slice(0, permission.indexOf("_"));
                    })
                  )
                : permissionsState;
            if (myPermissions.length > 0) {
              seft.setState({
                permissions: myPermissions
              });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    })
    .catch(function(err) {
      seft.setState({
        alert: (
          <SweetAlert
            error
            style={{ display: "block" }}
            title={`Xin lỗi`}
            onConfirm={() => {
              deleteCookie("access_token");
              seft.props.history.push("/dang-nhap");
            }}
            confirmBtnBsStyle="info"
          >
            Bộ quyền của bạn vừa được chỉnh sửa, xin vui lòng đăng nhập lại để
            tiếp tục.
          </SweetAlert>
        )
      });
    });
};

export const getPermissionBrowse = that => {
  const seft = that;
  axios({
    method: "GET",
    url: HOST + "/api/me",
    headers: { access_token: getCookie("access_token") }
  })
    .then(function(res) {
      res.data.roles.forEach(role => {
        axios({
          method: "GET",
          url: HOST + "/api/permissions/by-role/" + role._id,
          headers: { access_token: getCookie("access_token") }
        })
          .then(function(res) {
            const permissionsState = seft.state.permissions;
            const permissions = res.data;
            const myPermissions = permissionsState.concat(
              permissions.filter(permission => {
                return (
                  permission.slice(0, permission.indexOf("_")) === "browse"
                );
              })
            );
            seft.setState({
              permissions: myPermissions
            });
          })
          .catch(function(res) {
            console.log(res);
          });
      });
    })
    .catch(function(res) {
      console.log(res);
    });
};
