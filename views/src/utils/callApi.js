import HOST from "../constants/host";
import axios from "axios";

export default function callApi(
  endpoint,
  method = "GET",
  data = null,
  formData = false
) {
  return axios({
    method: method,
    url: `${HOST}${endpoint}`,
    data: data,
    headers: {
      "content-type": !formData
        ? "application/json;charset=UTF-8"
        : "multipart/form-data",
      "x-auth-user": localStorage.getItem("user"),
      "x-auth-token": localStorage.getItem("access_token")
    }
  }).then(res => {
    if (res.data.status === "AUTH") {
      localStorage.clear();
      window.location.href = "/";
    } else {
      return res;
    }
  });
}
