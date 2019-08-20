/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter
} from "reactstrap";
import { PanelHeader, MaterialInputText, Button } from "components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { validateEmail } from "../../../utils/validate";
import { actGetListAccAdmin, actUpdateAccAdmin } from "../../../actions/adminaccount.action";

class AdminAccountUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dateOfBirth:"",
      AdminAccountUpdate: [
        {
          name: "name",
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
          name: "address",
          value: "",
          error: false,
          errorMessage: ""
        }
        
      ]
    };

  }


  componentDidMount() {
      this.props.getListAccAdmin();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.AdminAccountUpdate && nextProps.AdminAccountUpdate.data) {
        this.setAccEdit(nextProps.AdminAccountUpdate.data);
      }
  }

  setAccEdit = gamedetail => {
    const { AdminAccountUpdate } = this.state;
    AdminAccountUpdate.map(prop => {
      prop.value = gamedetail[prop.name];
      return null;
    });
  }

  handleOnChange = e => {
    const AdminAccountUpdate = this.state.AdminAccountUpdate;
    AdminAccountUpdate.map(prop => {
      if (prop.name === e.target.name) {
        prop.value = e.target.value;
        prop.error = false;
        prop.errorMessage = "";
        return prop;
      }
      return prop;
    });
    this.setState({
      AdminAccountUpdate
    });
  }

  validate = () => {
    const AdminAccountUpdate = this.state.AdminAccountUpdate;
    AdminAccountUpdate.map(prop => {
      if (prop.name === "email" && !validateEmail(prop.value)) {
        prop.error = true;
        prop.errorMessage = "Email không hợp lệ.";
        this.setState({ AdminAccountUpdate });
      } else if (prop.value === "" && prop.name !== "email") {
        prop.error = true;
        prop.errorMessage = "Vui lòng điền thông tin.";
        this.setState({ AdminAccountUpdate });
      }
      return null;
    });
    const result = AdminAccountUpdate.filter(AdminAccountUpdate => AdminAccountUpdate.error === true);
    if (result.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  handleOnSubmit = () => {
    var isValid = this.validate();
    const { AdminAccountUpdate,dateOfBirth } = this.state;
    if (isValid) {
        this.props.updateAccAdmin(
          AdminAccountUpdate[0].value,
          dateOfBirth,
          AdminAccountUpdate[1].value,
          AdminAccountUpdate[2].value
        )
    }
  }

  render() {
    const { AdminAccountUpdate } = this.state;
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
                      <CardTitle type="h5">Chỉnh sửa quản trị viên</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={AdminAccountUpdate[0].error}
                        errorMessage={AdminAccountUpdate[0].errorMessage}
                        name='name'
                        value={AdminAccountUpdate[0].value}
                        label="Tên" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={AdminAccountUpdate[1].error}
                        errorMessage={AdminAccountUpdate[1].errorMessage}
                        name='phone'
                        value={AdminAccountUpdate[1].value}
                        label="Số Điện thoại" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={AdminAccountUpdate[2].error}
                        errorMessage={AdminAccountUpdate[2].errorMessage}
                        name='address'
                        value={AdminAccountUpdate[2].value}
                        label="Địa chỉ" />
                    </Col>
                  </Row>
                
                </CardBody>
                <CardFooter className="text-center">
                  <Row>

                    <Col md="12" className="text-right ">
                      <Link to="/admin-page/quan-tri-vien">
                        <Button className="btnExit" simple color="danger" style={{ width: "150px" }}>
                          <i className="fas fa-times" /> Thoát
                                    </Button>
                      </Link>
                      <Button className="btnSave ml-2" simple color="success" onClick={this.handleOnSubmit} style={{ width: "150px" }}>
                        <i className="fas fa-check" />Cập nhật
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
    AdminAccountUpdate: state.adminaccount.listAccAdmin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAccAdmin: (
        name, dateOfBirth, phone, address
    ) => {
      dispatch(
        actUpdateAccAdmin(
            name, dateOfBirth, phone, address
        )
      );
    },
    getListAccAdmin: (id) => {
      dispatch(
        actGetListAccAdmin(id)
      );
    }
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminAccountUpdate);
AdminAccountUpdate.defaultProps = {

};

