import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Col,
  Row
} from "reactstrap";
import { Button } from "components";
import { Link } from "react-router-dom";
import PanelHeader from "../../../components/PanelHeader/PanelHeader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  actUpdateAccAdmin,
  actGetListAccAdmin
} from "../../../actions/adminaccount.action";
import { formatStringToDate } from "../../../utils/formatDate";
class AdminAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getListAccAdmin();
  }
  getListAccAdmin() {
    this.props.getListAccAdmin();
  }
  render() {
    const { listAccAdmins } = this.props;
    return (
      <div>
        <PanelHeader size="sm" />
        {this.state.alert}
        <div className="content">
          <Card className="card-apartment-table">
            <CardHeader>
              <CardTitle type="h5">Quản lí tài khoản</CardTitle>
              <Row>
                <Col md={"3"} />
                <Col md={"3"} />
                <Col md={"3"} />
                <Col md={"3"} />
                <Col className={"text-right"} md={{ size: 3 }}>
                  {/* <Link to="/admin-page/quan-tri-vien">
                    <Button
                      simple
                      style={{ width: "200px" }}
                      className="btn-customadd"
                    >
                      <i className="fas fa-gamepad" /> Sửa tài khoản
                    </Button>
                  </Link> */}
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <span>Tên</span>
                    </th>
                    <th>
                      <span>Tài khoản</span>
                    </th>
                    <th>
                      <span>Số điện thoại</span>
                    </th>
                    <th>
                      <span>Địa chỉ</span>
                    </th>
                    <th>
                      <span>Ngày tạo</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{listAccAdmins.data ? listAccAdmins.data.name : ""}</td>
                    <td>
                      {listAccAdmins.data ? listAccAdmins.data.username : ""}
                    </td>
                    <td>
                      {listAccAdmins.data ? listAccAdmins.data.phone : ""}
                    </td>
                    <td>
                      {listAccAdmins.data ? listAccAdmins.data.address : ""}
                    </td>
                    <td>
                      {listAccAdmins.data
                        ? formatStringToDate(listAccAdmins.data.createdAt)
                        : ""}
                    </td>
                    <td>
                      <Link to={"/admin-page/sua-quan-tri-vien"}>
                        <Button className="btn-simple btn-icon btn btn-warning btn-sm">
                          <i className="fas fa-pen" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listAccAdmins: state.adminaccount.listAccAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListAccAdmin: () => {
      dispatch(actGetListAccAdmin());
    },
    updateAccAdmin: () => {
      dispatch(actUpdateAccAdmin());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminAccount);
AdminAccount.propTypes = {
  data: PropTypes.object
};
AdminAccount.defaultProps = {
  data: {}
};
