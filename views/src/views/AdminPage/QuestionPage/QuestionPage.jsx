import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Table,
  Col,
  Row
} from "reactstrap";
import { Button } from "components";
import { Link } from "react-router-dom";
import PanelHeader from "../../../components/PanelHeader/PanelHeader";

import {
  actGetListQuestion,
  actRemoveQuestion,
  actGetInfoGame,
  actImportExcelRequest
} from "../../../actions/question.action";
import AlertWarning from "components/SweetAlert/AlertWarning";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getListQuestion(this.props.match.params.id);
    this.getListInfoGame(this.props.match.params.id);
  }
  getListInfoGame(id) {
    this.props.getInfoGame(id);
  }
  getListQuestion(id) {
    this.props.getListQuestion(id);
  }
  _deleteQuestion(id) {
    this.setState({
      alert: (
        <AlertWarning
          message="Bạn có chắc sẽ xóa câu hỏi này?"
          confirmToFunc={() => {
            this._hideAlert();
            this._handleDeleteQuestion(id);
          }}
          cancleToFunc={() => {
            this._hideAlert();
          }}
        />
      )
    });
  }

  _hideAlert = () => {
    this.setState({ alert: "" });
  };
  _handleDeleteQuestion = id => {
    this.props.deteleQuestion(id, this.props.match.params.id);
  };
  _addFile = e => {
    let files = e.target.files;
    if (files.length > 0) {
      let file = files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("game_id", this.props.match.params.id);
      this.props.importQuestions(data, this.props.match.params.id);
    }
  };
  onButtonClick = e => {
    e.preventDefault();
    this.refs.fileUploaderxz.click();
  };
  render() {
    const { listQuestions, infoGame } = this.props;
    return (
      <div>
        {this.state.alert}
        <PanelHeader size="sm" />
        <div className="content">
          <Card className="card-apartment-table">
            <CardHeader>
              <CardTitle type="h5">
                Danh sách câu hỏi {infoGame.data ? infoGame.data.name : ""}
              </CardTitle>
              <Row>
                <Col md={"3"} />
                <Col md={"3"} />
                <Col className={"text-right"} md={{ size: 3 }}>
                  <Button
                    simple
                    color="primary"
                    onClick={e => this.onButtonClick(e)}
                    style={{ width: "200px" }}
                  >
                    <i className="fas fa-external-link-alt" /> Import từ Excel
                  </Button>{" "}
                  <input
                    type="file"
                    name="fileUpload"
                    className="inputFileHidden"
                    style={{ display: "none", zIndex: -1 }}
                    ref="fileUploaderxz"
                    accept={".xls, .xlsx"}
                    onChange={this._addFile}
                  />
                </Col>
                <Col className={"text-right"} md={{ size: 3 }}>
                  <Link
                    to={
                      "/admin-page/them-cau-hoi/" + this.props.match.params.id
                    }
                  >
                    <Button
                      simple
                      style={{ width: "200px" }}
                      className="btn-customadd"
                    >
                      <i className="fas fa-gamepad" /> Tạo Câu Hỏi
                    </Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <span>Game ID</span>
                    </th>
                    <th>
                      <span>Câu số</span>
                    </th>
                    <th>
                      <span>Câu hỏi</span>
                    </th>
                    <th>
                      <span>Số người trả lời sai</span>
                    </th>
                    <th>
                      <span>Số người trả lời đúng</span>
                    </th>
                    <th>
                      <span>Giải thích</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listQuestions.data &&
                    listQuestions.data.map((props, key) => {
                      // const start_date = new Date(
                      //   props.start_date
                      // ).toLocaleDateString("vi-VI");
                      return (
                        <tr key={key}>
                          <td>{props.game_id}</td>
                          <td>{props.ordinalNumber}</td>
                          <td>{props.title}</td>
                          <td className="text-center">{props.wrongQuantity}</td>
                          <td className="text-center">{props.rightQuantity}</td>
                          <td style={{ width: "30%" }}>{props.explain}</td>
                          <td className="text-right">
                            <Link to={"/admin-page/sua-cau-hoi/" + props._id}>
                              <Button className="btn-simple btn-icon btn btn-warning btn-sm">
                                <i className="fas fa-pen" />
                              </Button>
                            </Link>
                            <Link to={"/admin-page/xem-cau-hoi/" + props._id}>
                              <Button className="btn-simple btn-icon btn btn-info btn-sm">
                                <i className="fas fa-eye" />
                              </Button>
                            </Link>
                            <Button
                              className="btn-simple btn-icon btn btn-danger btn-sm"
                              onClick={() => {
                                this._deleteQuestion(props._id);
                              }}
                            >
                              <i className="fas fa-trash" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </CardBody>
            <CardFooter className="text-right">
              {/* <Pagination
                page={listGames.page}
                totalPages={listGames.totalPages}
                getListByPage={props.handleGetStaffsByPage}
                linkTo={"/home-service"}
              /> */}
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listQuestions: state.question.listQuestion,
    infoGame: state.question.infoGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListQuestion: id => {
      dispatch(actGetListQuestion(id));
    },
    deteleQuestion: (id, game_id) => {
      dispatch(actRemoveQuestion(id, game_id));
    },
    getInfoGame: id => {
      dispatch(actGetInfoGame(id));
    },
    importQuestions: (data, game_id) => {
      dispatch(actImportExcelRequest(data, game_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionPage);
QuestionPage.propTypes = {
  data: PropTypes.object
};
QuestionPage.defaultProps = {
  data: {}
};
