import callApi from "../utils/callApi";
const Authentication = {
  login(data) {
    return callApi("login", "POST", data).then(res => res.data);
  },
  checkLogin() {
    var isLogin = false;
    if (localStorage.getItem("access_token")) {
      isLogin = true;
    }
    return isLogin;
  }
};

export default Authentication;
