import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { Button } from "components";
import logo from "assets/image/wejelly/Logo_ACBIQ_300x300.png";
import bgImage from "assets/image/wejelly/bg.jpg";
import { actLoginRequest } from "../../actions/authentication.action";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      isLogin: false
    };
    this.username = React.createRef();
    this.password = React.createRef();
  }

  componentWillMount() {
    localStorage.removeItem("access_token_admin");
  }

  componentWillReceiveProps(nextProps) {
    this._isLoginCheck(nextProps);
  }

  _isLoginCheck = nextProps => {
    const auth = nextProps.authentication;
    if (auth.isLogin === false) {
      this.setState({
        message: "Username và pasword không hợp lệ, vui lòng điền lại.",
        isLoading: false
      });
    } else if (auth.isLogin === true) {
      localStorage.setItem("access_token_admin", auth.token);
      this.setState({
        alert: (
          <SweetAlert
            success
            style={{ display: "block" }}
            title={`Xin chào, WeJelly!`}
            onConfirm={() => this.props.history.push("/admin-page")}
            confirmBtnBsStyle="info"
          >
            Chào mừng bạn đã trở lại với ACB IQ.
          </SweetAlert>
        )
      });
    }
  };

  onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.handleLoginClick();
    }
  };

  handleLoginClick = () => {
    const username = this.username.current.value;
    const pass = this.password.current.value;
    if (!username || !pass) {
      this.setState({
        message: "* Vui lòng điền thông tin trước khi đăng nhập"
      });
    } else {
      this.setState({ isLoading: true });
      this.props.login(username, pass);
    }
  };

  render() {
    return (
      <div>
        {this.state.isLogin && <Redirect to="/admin-page" />}
        {this.state.alert}
        <div className="full-page-content">
          <div className="login-page">
            <Container>
              <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
                <Form>
                  <Card className="card-login card-plain">
                    <CardHeader>
                      <div className="logo-container">
                        <div
                          className="now_acb_logo_logi"
                          style={{ width: "100%!important" }}
                        >
                          <img src={logo} alt="now-logo" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          "no-border form-control-lg " +
                          (this.state.firstnameFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="User Name"
                          innerRef={this.username}
                          onFocus={e => this.setState({ firstnameFocus: true })}
                          onBlur={e => this.setState({ firstnameFocus: false })}
                          onKeyDown={this.onKeyDown}
                        />
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border form-control-lg " +
                          (this.state.lastnameFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          innerRef={this.password}
                          onFocus={e => this.setState({ lastnameFocus: true })}
                          onBlur={e => this.setState({ lastnameFocus: false })}
                          onKeyDown={this.onKeyDown}
                          autocomplete="new-password"
                        />
                      </InputGroup>
                      <div className="message" style={{ color: "white" }}>
                        {this.state.message}
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Button
                        block
                        round
                        color="login"
                        simple
                        size="lg"
                        href="#pablo"
                        className="mb-3 submit_login_cms"
                        onClick={this.handleLoginClick}
                        isLoading={this.state.isLoading}
                      >
                        Đăng nhập
                      </Button>
                      <div className="pull-right">
                        <h6>
                          <a href="#pablo" className="link footer-link">
                            Forgot Password?
                          </a>
                        </h6>
                      </div>
                    </CardFooter>
                  </Card>
                </Form>
              </Col>
            </Container>
          </div>
        </div>
        <div
          className="full-page-background"
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(actLoginRequest(username, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
