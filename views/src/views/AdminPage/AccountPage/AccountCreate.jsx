import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Label,
  Input
} from "reactstrap";
import { PanelHeader, MaterialInputText,MaterialSelect, Button } from "components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { validateNumberBonus } from "../../../utils/validateNumberX";
import { actGetAccountByID, actUpdateAccountRequest, actCreateAccountRequest } from "../../../actions/account.action";
import DateFnsUtils from "@date-io/date-fns";
import viLocale from "date-fns/locale/vi";
import PropTypes from "prop-types";
import { Editor } from '@tinymce/tinymce-react';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import callApi from "utils/callApiCms";

class AccountCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: new Date(),
      accountcreate: [
        
        {
          name: "account",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "password",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "role",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "fullname",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "mail",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "mobile",
          value: "",
          error: false,
          errorMessage: ""
        }
      ],
      isEdit: window.location.pathname.split("/admin-page/")[1] === "sua-account/" + this.props.match.params.account_id
    };

  }


  componentDidMount() {
    if (this.state.isEdit === true) {
      this.props.getListAccountID(this.props.match.params.account_id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isEdit === true) {
      if (nextProps.listAccountDetail && nextProps.listAccountDetail.data) {
        this.setAccountEdit(nextProps.listAccountDetail.data);
        this.setState({
          createdAt:nextProps.listAccountDetail.data.createdAt
        })
      }
    }
  }

  setAccountEdit = accountdetail => {
    const { accountcreate } = this.state;
    accountcreate.map(prop => {
      prop.value = accountdetail[prop.name];
      return null;
    });
  }

  handleOnChange = e => {
  	console.log('handleOnChange',e.target.name)
    const {accountcreate} = this.state;

    accountcreate.map(prop => {
      if (prop.name === e.target.name) {
        prop.value = e.target.value;
        prop.error = false;
        prop.errorMessage = "";
        return prop;
      }
      return prop;
    });
    this.setState({
      accountcreate
    });
    console.log(accountcreate)
  }

  validate = () => {
    const accountcreate = this.state.accountcreate;
    accountcreate.map(prop => {
      if (prop.value === "" && prop.value === "."  ) {
        prop.error = true;
        prop.errorMessage = "Vui lòng điền thông tin.";
        this.setState({ accountcreate });
      }
      return null;
    });
    const result = accountcreate.filter(accountcreate => accountcreate.error === true);
    if (result.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  handleOnSubmit = () => {
    var isValid = this.validate();
    


    const { accountcreate,createdAt } = this.state;

    if (isValid) {
      if (this.state.isEdit === true) {
        this.props.updateAccountRequest(
          this.props.match.params.account_id,
          ...accountcreate.map(a => a.value),
          createdAt
        );
      } else {
        this.props.createAccountRequest(
          ...accountcreate.map(a => a.value),
          createdAt
        );
      }

    }
  }
  _handleOnChangeDatestart = date => {
    // let convertD = formatStringToTime(date);
    this.setState({
      createdAt: new Date(date)
    });
  };
  render() {
    const { accountcreate, isEdit, createdAt } = this.state;
    return (
      <div>
        {this.state.alert}
        <PanelHeader size="sm" />
        <div className="content ">
          <Row>
            <Col md="7" xs="12" className="m-auto">
              <Card className="card-staff card-form-staff card-announcement-new">
                <CardHeader>
                  <Row>
                    <Col md="8" xs="9">
                      <CardTitle type="h5">{isEdit === true ? "Chỉnh sửa account" : "Thêm account mới"}</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={accountcreate[0].error}
                        errorMessage={accountcreate[0].errorMessage}
                        name='account'
                        value={accountcreate[0].value}
                        label="Tài khoản" />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={accountcreate[1].error}
                        errorMessage={accountcreate[1].errorMessage}
                        name='password'
                        value={accountcreate[1].value}
                        type="password"
                        label="Mật khẩu" />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <MaterialSelect
                        onChange={this.handleOnChange}
                        error={accountcreate[2].error}
                        errorMessage={accountcreate[2].errorMessage}
                        name='role'
                        value={accountcreate[2].value}
                        data={[{label:"Doanh nghiệp",value:"1"},{label:"Người dùng",value:"2"}]}
                        label="Role" />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={accountcreate[3].error}
                        errorMessage={accountcreate[3].errorMessage}
                        name='fullname'
                        value={accountcreate[3].value}
                        label="Họ tên" />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={accountcreate[4].error}
                        errorMessage={accountcreate[4].errorMessage}
                        name='mail'
                        value={accountcreate[4].value}
                        label="Email" />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={accountcreate[5].error}
                        errorMessage={accountcreate[5].errorMessage}
                        name='mobile'
                        value={accountcreate[5].value}
                        label="Điện thoại" />
                    </Col>
                  </Row>
                  
                  <Row className="mt-3">
                    <Col md="12">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                        <div className="picker">
                          <DateTimePicker
                            value={createdAt}
                            disablePast
                            ampm={false}
                            onChange={this._handleOnChangeDatestart}
                            label="Thời gian bắt đầu"
                            showTodayButton
                            format="yyyy/MM/dd hh:mm"
                          />
                        </div>
                      </MuiPickersUtilsProvider>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-center">
                  <Row>

                    <Col md="12" className="text-right ">
                      <Link to="/admin-page/danh-sach-account/">
                        <Button className="btnExit" simple color="danger" style={{ width: "150px" }}>
                          <i className="fas fa-times" /> Thoát
                                    </Button>
                      </Link>
                      <Button className="btnSave ml-2" simple color="success" onClick={this.handleOnSubmit} style={{ width: "150px" }}>
                        <i className="fas fa-check" />{isEdit === true ? "Cập nhật" : "Lưu"}
                      </Button>

                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listAccountDetail: state.accountReducer.accountDetail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createAccountRequest: (
      account, password, role, fullname, mail, mobile, createdAt
    ) => {
      dispatch(
        actCreateAccountRequest(
          account, password, role, fullname, mail, mobile, createdAt
        )
      );
    },
    updateAccountRequest: (
      account_id, account, password, role, fullname, mail, mobile, createdAt
    ) => {
      dispatch(
        actUpdateAccountRequest(
          account_id, account, password, role, fullname, mail, mobile, createdAt
        )
      );
    },
    getListAccountID: (id) => {
      dispatch(
        actGetAccountByID(id)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCreate);
AccountCreate.propTypes = {
  accountcreate: PropTypes.object
};