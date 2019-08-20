import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Table,
  Col,
  Row,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Button } from "components";
import { Link } from "react-router-dom";
import PanelHeader from "../../../components/PanelHeader/PanelHeader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actGetListUser, actGetListGame } from "../../../actions/user.action";
import Pagination from "../../../components/Pagination/Pagination";
import getUrlParam from "utils/getUrlParam";
import host from "../../../constants/host";
import { formatMoney } from "../../../utils/formatMoney";
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGameID: "all",
      valueStatus: "all",
      user_id: "",
      page: 1
    };
  }
  componentDidMount() {
    const { valueGameID, valueStatus, user_id } = this.state;
    const pageParam = getUrlParam()["page"];
    this.getListUser(user_id, valueGameID, valueStatus, pageParam);
    this.getListGames();
  }
  getListUser(user_id, game_id, status, pageParam) {
    this.props.getListUser(user_id, game_id, status, pageParam);
  }
  getListUserSearch = value => {
    const { valueGameID, valueStatus, user_id } = this.state;
    this.props.getListUser(user_id, valueGameID, valueStatus, value);
  };
  getListGames() {
    this.props.getListGame();
  }
  handleGameID = event => {
    const { valueStatus, user_id, page } = this.state;
    let valueSelected = event.target.value;
    this.setState({
      valueGameID: valueSelected
    });
    this.getListUser(user_id, valueSelected, valueStatus, page);
  };
  handleStatus = event => {
    const { valueGameID, user_id, page } = this.state;
    let valueSelected = event.target.value;
    this.setState({
      valueStatus: event.target.value
    });
    this.getListUser(user_id, valueGameID, valueSelected, page);
  };
  handleSearchUser = e => {
    let valueUserID = e.target.value;
    this.setState({
      user_id: valueUserID
    });
    const { valueGameID, valueStatus, page } = this.state;
    this.getListUser(valueUserID, valueGameID, valueStatus, page);
  };
  render() {
    const { listUsers, listGameUsers } = this.props;
    const { valueGameID, valueStatus, user_id } = this.state;
    return (
      <div>
        <PanelHeader size="sm" />
        {this.state.alert}
        <div className="content">
          <Card className="card-apartment-table">
            <CardHeader>
              <CardTitle type="h5">Danh sách người chơi</CardTitle>
              <Row>
                <Col md={"3"}>
                  <FormGroup>
                    <Label for="inputAnswer">Tìm theo Game</Label>
                    <Input
                      type="select"
                      name="select"
                      onChange={this.handleGameID}
                      value={valueGameID}
                      id="inputAnswer"
                    >
                      <option value="all">All</option>
                      {listGameUsers.data &&
                        listGameUsers.data.map((props, key) => {
                          return (
                            <option key={key} value={props.game_id}>
                              {props.name}
                            </option>
                          );
                        })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={"3"}>
                  <FormGroup>
                    <Label for="inputAnswer">Tìm theo trạng thái</Label>
                    <Input
                      type="select"
                      name="select"
                      onChange={this.handleStatus}
                      value={valueStatus}
                      id="inputAnswer"
                    >
                      <option value="all">All</option>
                      <option value="WIN">WIN</option>
                      <option value="LOSE">LOSE</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={"3"}>
                  <FormGroup>
                    <Label for="inputUSer">Tìm theo tài khoản</Label>
                    <Input
                      type="text"
                      name="Tài Khoản"
                      onChange={this.handleSearchUser}
                      id="inputUSer"
                    />
                  </FormGroup>
                </Col>
                <Col className={"text-center"} md={{ size: 3 }}>
                  <a
                    href={
                      host +
                      "game/export?game_id=" +
                      valueGameID +
                      "&status=" +
                      valueStatus +
                      "&user_id=" +
                      user_id
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button simple color="primary">
                      <i className="fas fa-external-link-alt" /> Xuất file Excel
                    </Button>{" "}
                  </a>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <span>Tên Game</span>
                    </th>
                    <th>
                      <span>Tên</span>
                    </th>
                    <th>
                      <span>Tài khoản</span>
                    </th>
                    <th>
                      <span>Số câu trả lời đúng</span>
                    </th>
                    <th>
                      <span>Trạng thái</span>
                    </th>
                    <th>
                      <span>Số tiền nhận được</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listUsers.data &&
                    listUsers.data.docs.map((props, key) => {
                      return (
                        <tr key={key}>
                          <td>{props.game ? props.game.name : ""}</td>
                          <td>{props.user ? props.user.lastname : ""}</td>
                          <td>{props.user ? props.user.user_id : ""}</td>
                          <td>{props.point}</td>
                          <td>{props.status}</td>
                          <td>{formatMoney(parseInt(props.prize)) + "₫"}</td>
                          <td className="text-right">
                            <Link
                              to={
                                "/admin-page/xem-lich-su-nguoi-choi/" +
                                props.user_id
                              }
                            >
                              <Button className="btn_question">
                                <i className="fas fa-eye" /> &nbsp; Xem lịch sử
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </CardBody>
            <CardFooter className="text-right">
              <Pagination
                page={listUsers.data ? listUsers.data.page : 1}
                totalPages={listUsers.data ? listUsers.data.totalPages : 1}
                getListByPage={this.getListUserSearch}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listUsers: state.user.listUSER,
    listGameUsers: state.user.listGameUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListUser: (user_id, game_id, status, page) => {
      dispatch(actGetListUser(user_id, game_id, status, page));
    },
    getListGame: () => {
      dispatch(actGetListGame());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
UserPage.propTypes = {
  data: PropTypes.object
};
UserPage.defaultProps = {
  data: {
    docs: []
  }
};
