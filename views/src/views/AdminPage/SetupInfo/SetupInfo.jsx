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
import { actGetListInfo } from "../../../actions/setupinfo.action";
import { formatStringToDate } from "../../../utils/formatDate";
class SetupInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getListInfo();
  }
  getListInfo() {
    this.props.getListInfo();
  }
  render() {
    const { listInfoSetups } = this.props;
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
                      <span>Luật chơi</span>
                    </th>
                    <th>
                      <span>Thời gian chờ câu hỏi</span>
                    </th>
                    <th>
                      <span>Thời gian chờ câu trả lời</span>
                    </th>
                    <th>
                      <span>Ngày tạo</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      dangerouslySetInnerHTML={{
                        __html: listInfoSetups.data
                          ? listInfoSetups.data.law
                          : ""
                      }}
                    />
                    <td>
                      {listInfoSetups.data
                        ? listInfoSetups.data.waitForTheNextQuestion
                        : ""}
                    </td>
                    <td>
                      {listInfoSetups.data
                        ? listInfoSetups.data.waitForTheAnswer
                        : ""}
                    </td>
                    <td>
                      {" "}
                      {formatStringToDate(
                        listInfoSetups.data ? listInfoSetups.data.createdAt : ""
                      )}
                    </td>

                    <td className="text-right">
                      <Link to={"/admin-page/sua-thong-tin-cai-dat"}>
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
    listInfoSetups: state.setupinfo.listInfoSetup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListInfo: () => {
      dispatch(actGetListInfo());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupInfo);
SetupInfo.propTypes = {
  data: PropTypes.object
};
SetupInfo.defaultProps = {
  data: {}
};
