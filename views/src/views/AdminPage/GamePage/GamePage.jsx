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
import { actGetListGame } from "../../../actions/game.action";
import { formatMoney } from "../../../utils/formatMoney";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { formatStringToTime } from "../../../utils/formatDate";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { socketGlobal } from "../../../utils/instanceSocket";
import renderStatus from "../../../utils/renderBookingStatus.jsx";
import { renderErrorSever } from "../../../utils/renderError";
import AlertWarning from "components/SweetAlert/AlertWarning";
import AlertErrorCheck from "components/SweetAlert/AlertErrorCheck";
class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      openning: false
    };
    socketGlobal.on("serverError", result => {
      let messageErrorSV = renderErrorSever(result.message);
      this._showError(messageErrorSV);
    });

    socketGlobal.on("responseGameInfo", () => {
      this.getListGame();
    });
  }
  componentDidMount() {
    this.getListGame();
  }
  getListGame() {
    this.props.getListGame();
  }
  sendOpenGame = (game_id, e) => {
    let checkedSwich = e.target.checked;
    this._showSuccess(game_id, checkedSwich);
  };
  _showError(messageErrorSV) {
    this.setState({
      alert: (
        <AlertErrorCheck
          message={messageErrorSV}
          confirmToFunc={() => {
            this._hideAlert();
          }}
        />
      )
    });
  }
  _showSuccess(game_id, checkedSwich) {
    this.setState({
      alert: (
        <AlertWarning
          message={
            checkedSwich
              ? "Bạn muốn bật game không!"
              : "Bạn muốn tắt game không"
          }
          confirmToFunc={() => {
            if (checkedSwich) {
              socketGlobal.emit("openGame", { game_id });
            } else {
              socketGlobal.emit("shutDownGame", { game_id });
              this.getListGame();
            }
            this._hideAlert();
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
  render() {
    const { listGames } = this.props;
    const IOSSwitch = withStyles(theme => ({
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1)
      },
      switchBase: {
        padding: 1,
        "&$checked": {
          transform: "translateX(16px)",
          color: theme.palette.common.white,
          "& + $track": {
            backgroundColor: "#52d869",
            opacity: 1,
            border: "none"
          }
        },
        "&$focusVisible $thumb": {
          color: "#52d869",
          border: "6px solid #fff"
        }
      },
      thumb: {
        width: 24,
        height: 24
      },
      track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"])
      },
      checked: {},
      focusVisible: {}
    }))(({ classes, ...props }) => {
      return (
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked
          }}
          {...props}
        />
      );
    });
    return (
      <div>
        <PanelHeader size="sm" />
        {this.state.alert}
        <div className="content">
          <Card className="card-apartment-table">
            <CardHeader>
              <CardTitle type="h5">Danh sách trò chơi</CardTitle>
              <Row>
                <Col md={"3"} />
                <Col md={"3"} />
                <Col md={"3"} />
                <Col className={"text-right"} md={{ size: 3 }}>
                  <Link to="/admin-page/them-tro-choi">
                    <Button
                      simple
                      style={{ width: "200px" }}
                      className="btn-customadd"
                    >
                      <i className="fas fa-gamepad" /> Tạo Game Mới
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
                      <span>Tên</span>
                    </th>
                    <th>
                      <span>Tiền thưởng</span>
                    </th>

                    <th>
                      <span>Trạng thái</span>
                    </th>
                    <th>
                      <span>Thời gian bắt đầu</span>
                    </th>
                    <th>Bật game</th>
                  </tr>
                </thead>
                <tbody>
                  {listGames.data &&
                    listGames.data.map((props, key) => {
                      // const start_date = new Date(
                      //   props.start_date
                      // ).toLocaleDateString("vi-VI");
                      return (
                        <tr key={key}>
                          <td>{props.name}</td>
                          <td>
                            {formatMoney(parseInt(props.bonus, 10)) + "₫"}
                          </td>
                          <td>{renderStatus(props.status)}</td>
                          <td>{formatStringToTime(props.start_date)}</td>
                          <td>
                            <FormControlLabel
                              hidden={props.status === "FINISHED"}
                              control={
                                <IOSSwitch
                                  checked={
                                    props.status === "PLAYING" ||
                                    props.status === "OPENING"
                                      ? true
                                      : false
                                  }
                                  onClick={e =>
                                    this.sendOpenGame(props.game_id, e)
                                  }
                                  value="checkedB"
                                />
                              }
                            />
                          </td>
                          <td className="text-right">
                            <Link
                              to={
                                "/admin-page/danh-sach-cau-hoi/" + props.game_id
                              }
                            >
                              <Button className="btn_question">
                                <i className="fas fa-question-circle" /> &nbsp;
                                Câu hỏi
                              </Button>
                            </Link>
                            <Link
                              to={
                                "/admin-page/xem-chi-tiet-tro-choi/" +
                                props.game_id
                              }
                            >
                              <Button className="btn-simple btn-icon btn btn-info btn-sm">
                                <i className="fas fa-eye" />
                              </Button>
                            </Link>
                            <Link
                              to={"/admin-page/sua-tro-choi/" + props.game_id}
                            >
                              <Button
                                className="btn-simple btn-icon btn btn-warning btn-sm"
                                hidden={
                                  props.status === "OPENING" ||
                                  props.status === "PLAYING" ||
                                  props.status === "FINISHED"
                                }
                              >
                                <i className="fas fa-pen" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
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
    listGames: state.gameReducer.listGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListGame: () => {
      dispatch(actGetListGame());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
GamePage.propTypes = {
  data: PropTypes.object
};
GamePage.defaultProps = {
  data: {}
};
