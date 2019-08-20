import React, { Component } from "react";
import { Form, Input, Label } from "reactstrap";
import logo_acb from "../assets/image/logo_acb.png";
import bg_login from "../assets/image/bg_login.jpg";
import img_form from "../assets/image/img_in_form.png";
import logo_bottom from "../assets/image/logo_bottom.png";
import Button from "../components/CustomButton/Button";
// import { validateEmail } from "utils/validate";
import { socketGlobal } from "../utils/instanceSocket";
import { Link } from "react-router-dom";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLogin: false
    };
    socketGlobal.on("responseLogin", result => {
      if (result.success) {
        const token = result.token;
        localStorage.setItem("access_token", token);
        this.handleOnEnded();
      } else {
        this.setState({
          isLoading: false,
          alert: "Tài khoản đăng nhập không đúng!"
        });
      }
    });
  }
  onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this._handleSubmit();
    }
  };

  _handleSubmit = () => {
    const password = this.state.password;
    const email = this.state.email;
    this.setState({ isLoading: true });
    if (!email || !password) {
      this.setState({
        alert: "Vui lòng nhập đầy đủ các trường thông tin!",
        isLoading: false
      });
      // } else if (!validateEmail(email)) {
      //   this.setState({
      //     alert: "Email bạn nhập không hợp lệ!",
      //     isLoading: false
      //   });
    } else {
      socketGlobal.emit("login", {
        user_id: this.state.email,
        password: this.state.password
      });
    }
  };
  handleOnEnded = () => {
    setTimeout(() => {
      this.setState({
        isLoading: false,
        alert: ""
      });
      this.props.handleOnEnded();
    }, 1000);
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    if (this.props.bg_music_on_off) {
      this.props.handleMusicBG(false);
    }
  }
  render() {
    return (
      <div className="view_login">
        <img src={bg_login} alt="" className="bg_login" />
        <div className="min_width_page">
          <div className="logo_page">
            <Link to="/">
              <img src={logo_acb} className="img_acb" alt="" />
            </Link>
          </div>
          <div className="form_login">
            <div className="img_form">
              <img src={img_form} className="img_form" alt="" />
            </div>
            <div className="handle_login_wp">
              <Form className="handle_login">
                <Label className="title_login">đăng nhập</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="User AD"
                  onChange={this.handleOnChange}
                  onKeyDown={this.onKeyDown}
                  autoFocus
                />

                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Mật khẩu"
                  onChange={this.handleOnChange}
                  onKeyDown={this.onKeyDown}
                />
                <Button
                  className="button_submit_login"
                  isLoading={this.state.isLoading}
                  onClick={this._handleSubmit}
                >
                  Đăng nhập
                </Button>
                <div className="text-danger text-center mt-2">
                  {this.state.alert}
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="logo_bottom_">
          <img src={logo_bottom} className="logo_bottom" alt="" />
        </div>
      </div>
    );
  }
}

export default LoginPage;
