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
import { actGetListNews, actDeleteNewsRequest } from "../../../actions/news.action";
import { formatMoney } from "../../../utils/formatMoney";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { formatStringToTime } from "../../../utils/formatDate";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import getUrlParam from "utils/getUrlParam";
import Pagination from "../../../components/Pagination/Pagination";
// import { socketGlobal } from "../../../utils/instanceSocket";
import renderStatus from "../../../utils/renderBookingStatus.jsx";
import { renderErrorSever } from "../../../utils/renderError";
import AlertWarning from "components/SweetAlert/AlertWarning";
import AlertErrorCheck from "components/SweetAlert/AlertErrorCheck";
import AlertSuccess from "components/SweetAlert/AlertSuccess";
class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      openning: false,
      page:1
    };
    this.getListNewsPagging = this.getListNewsPagging.bind(this);
  }
  componentDidMount() {
    const page = getUrlParam()["page"];
    this.getListNews({page});
  }
  getListNewsPagging(value) {
    const page = value;
    this.getListNews({page});
  }
  getListNews(query) {
    this.props.getListNews(query);
  }
  _showError(messageErrorSV) {
    this.setState({
      alert: (
        <AlertSuccess
          message={messageErrorSV}
          confirmToFunc={() => {
            this._hideAlert();
          }}
        />
      )
    });
  }
  handleDelete = (e) => {
    this.props.deleteNews(e);
  }
  _hideAlert(){
    const page = getUrlParam()["page"];
    this.props.getListNews({page});
    this.setState({ alert: "" });
  };
  render() {
    const { listNewss } = this.props;
    const IOSSwitch = withStyles(theme => ({
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1)
      },
      switchBase: {
        padding: 1,
        "&": {
          transform: "translateX(16px)",
          color: theme.palette.common.white,
          "& + ": {
            backgroundColor: "#52d869",
            opacity: 1,
            border: "none"
          }
        },
        "& ": {
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
        border: `1px solid `,
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
              <CardTitle type="h5">Danh sách news</CardTitle>
              <Row>
                <Col md={"3"} />
                <Col md={"3"} />
                <Col md={"3"} />
                <Col className={"text-right"} md={{ size: 3 }}>
                  <Link to="/admin-page/them-news">
                    <Button
                      simple
                      style={{ width: "200px" }}
                      className="btn-customadd"
                    >
                      <i className="fas fa-gamepad" /> Tạo News Mới
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
                      <span>Mã</span>
                    </th>

                    <th>
                      <span>Link</span>
                    </th>
                    <th>
                      <span>Ảnh</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  { listNewss.data && Object.keys(listNewss).length > 0 &&
                    listNewss.data.docs.map((props, key) => {
                      return (
                        <tr key={key}>
                          <td>{props.name}</td>
                          <td> {props.code} </td>
                          <td> {props.link}</td>
                          <td> <img src={props.img} height="80"/></td>
                          <td className="text-right">
                            <Link
                              to={"/admin-page/sua-news/" + props.news_id}
                            >
                              <Button className="btn-simple btn-icon btn btn-info btn-sm">
                                <i className="fas fa-pen" />
                              </Button>
                            </Link>
                            <Button className="btn-simple btn-icon btn btn-info btn-sm" onClick={()=> this.handleDelete(props.news_id)}>
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
              <Pagination
                page={listNewss.data ? listNewss.data.page : 1}
                totalPages={listNewss.data ? listNewss.data.totalPages : 1}
                getListByPage={this.getListNewsPagging}
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
    listNewss: state.newsReducer.listNews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListNews: (query) => {
      dispatch(actGetListNews(query));
    },
    deleteNews: (news_id)=>{
      dispatch(actDeleteNewsRequest(news_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsPage);
NewsPage.propTypes = {
  data: PropTypes.object
};
NewsPage.defaultProps = {
  data: {}
};

