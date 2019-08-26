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
import { PanelHeader, MaterialInputText, Button } from "components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { validateNumberBonus } from "../../../utils/validateNumberX";
import { actGetEnterpriseByID, actUpdateEnterpriseRequest, actCreateEnterpriseRequest } from "../../../actions/enterprise.action";
import DateFnsUtils from "@date-io/date-fns";
import viLocale from "date-fns/locale/vi";
import PropTypes from "prop-types";
import { Editor } from '@tinymce/tinymce-react';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import callApi from "utils/callApiCms";

class EnterpriseCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: new Date(),
      enterprisecreate: [
        {
          name: "name",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "user_id",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "icon",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "address",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "phone",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "email",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "status",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "introdution",
          value: "",
          error: false,
          errorMessage: ""
        }
      ],
      isEdit: window.location.pathname.split("/admin-page/")[1] === "sua-enterprise/" + this.props.match.params.enterprise_id
    };

  }


  componentDidMount() {
    if (this.state.isEdit === true) {
      this.props.getListEnterpriseID(this.props.match.params.enterprise_id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isEdit === true) {
      if (nextProps.listEnterpriseDetail && nextProps.listEnterpriseDetail.data) {
        this.setEnterpriseEdit(nextProps.listEnterpriseDetail.data);
        this.setState({
          createdAt:nextProps.listEnterpriseDetail.data.createdAt
        })
      }
    }
  }

  setEnterpriseEdit = enterprisedetail => {
    const { enterprisecreate } = this.state;
    enterprisecreate.map(prop => {
      prop.value = enterprisedetail[prop.name];
      return null;
    });
  }

  handleOnChange = e => {
    const {enterprisecreate,image} = this.state;

    enterprisecreate.map(prop => {
      if (prop.name === e.target.name) {
        prop.value = e.target.value;
        prop.error = false;
        prop.errorMessage = "";
        return prop;
      }
      return prop;
    });
    this.setState({
      enterprisecreate
    });
    
  }

  validate = () => {
    const enterprisecreate = this.state.enterprisecreate;
    enterprisecreate.map(prop => {
      // if (prop.name === "bonus" && !validateNumberBonus(prop.value)) {
      //   prop.error = true;
      //   prop.errorMessage = "Thông tin không hợp lệ (bắt buộc phải là số).";
      //   this.setState({ enterprisecreate });
      // } else 
      if (prop.value === "" && prop.value === "."  ) {
        prop.error = true;
        prop.errorMessage = "Vui lòng điền thông tin.";
        this.setState({ enterprisecreate });
      }
      return null;
    });
    const result = enterprisecreate.filter(enterprisecreate => enterprisecreate.error === true);
    if (result.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  handleOnSubmit = () => {
    var isValid = this.validate();
    


    const { enterprisecreate,createdAt } = this.state;
    if (isValid) {
      if (this.state.isEdit === true) {
        this.props.updateEnterpriseRequest(
          this.props.match.params.enterprise_id,
          ...enterprisecreate.map(a => a.value),
          createdAt
        );
      } else {
        this.props.createEnterpriseRequest(
          ...enterprisecreate.map(a => a.value),
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
    const { enterprisecreate, isEdit, createdAt } = this.state;
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
                      <CardTitle type="h5">{isEdit === true ? "Chỉnh sửa enterprise" : "Thêm enterprise mới"}</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={enterprisecreate[0].error}
                        errorMessage={enterprisecreate[0].errorMessage}
                        name='name'
                        value={enterprisecreate[0].value}
                        label="Tên" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={enterprisecreate[4].error}
                        errorMessage={enterprisecreate[4].errorMessage}
                        name='phone'
                        value={enterprisecreate[4].value}
                        label="Điện thoại" />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={enterprisecreate[5].error}
                        errorMessage={enterprisecreate[5].errorMessage}
                        name='email'
                        value={enterprisecreate[5].value}
                        label="Email" />
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
                            label="Ngày tạo"
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
                      <Link to="/admin-page/danh-sach-enterprise/">
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
    listEnterpriseDetail: state.enterpriseReducer.enterpriseDetail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEnterpriseRequest: (
      name, user_id, icon, address, phone, email, introdution, createdAt
    ) => {
      dispatch(
        actCreateEnterpriseRequest(
          name, user_id, icon, address, phone, email, introdution, createdAt
        )
      );
    },
    updateEnterpriseRequest: (
      enterprise_id, name, user_id, icon, address, phone, email, introdution, createdAt
    ) => {
      dispatch(
        actUpdateEnterpriseRequest(
          enterprise_id, name, user_id, icon, address, phone, email, introdution, createdAt
        )
      );
    },
    getListEnterpriseID: (id) => {
      dispatch(
        actGetEnterpriseByID(id)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterpriseCreate);
EnterpriseCreate.propTypes = {
  enterprisecreate: PropTypes.object
};