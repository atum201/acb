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
import { actGetListBanner, actDeleteBannerRequest } from "../../../actions/banner.action";
import { formatMoney } from "../../../utils/formatMoney";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { formatStringToTime } from "../../../utils/formatDate";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import { socketGlobal } from "../../../utils/instanceSocket";
import renderStatus from "../../../utils/renderBookingStatus.jsx";
import { renderErrorSever } from "../../../utils/renderError";
import AlertWarning from "components/SweetAlert/AlertWarning";
import AlertErrorCheck from "components/SweetAlert/AlertErrorCheck";
import AlertSuccess from "components/SweetAlert/AlertSuccess";
class BannerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      openning: false
    };
  }
  componentDidMount() {
    this.getListBanner();
  }
  getListBanner() {
    this.props.getListBanner();
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
    this.props.deleteBanner(e);
  }
  _hideAlert(){
    this.props.getListBanner();
    this.setState({ alert: "" });
  };
  render() {
    const { listBanners } = this.props;
    console.log(listBanners)
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
              <CardTitle type="h5">Danh sách banner</CardTitle>
              <Row>
                <Col md={"3"} />
                <Col md={"3"} />
                <Col md={"3"} />
                <Col className={"text-right"} md={{ size: 3 }}>
                  <Link to="/admin-page/them-banner">
                    <Button
                      simple
                      style={{ width: "200px" }}
                      className="btn-customadd"
                    >
                      <i className="fas fa-gamepad" /> Tạo Banner Mới
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
                  { listBanners && Object.keys(listBanners).length > 0 &&
                    listBanners.map((props, key) => {
                      return (
                        <tr key={key}>
                          <td>{props.name}</td>
                          <td> {props.code} </td>
                          <td> {props.link}</td>
                          <td> <img src={props.img} height="80"/></td>
                          <td className="text-right">
                            <Link
                              to={"/admin-page/sua-banner/" + props.banner_id}
                            >
                              <Button className="btn-simple btn-icon btn btn-info btn-sm">
                                <i className="fas fa-pen" />
                              </Button>
                            </Link>
                            <Button className="btn-simple btn-icon btn btn-info btn-sm" onClick={()=> this.handleDelete(props.banner_id)}>
                                <i className="fas fa-trash" />
                              </Button>
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
    listBanners: state.bannerReducer.listBanner
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListBanner: () => {
      dispatch(actGetListBanner());
    },
    deleteBanner: (banner_id)=>{
      dispatch(actDeleteBannerRequest(banner_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerPage);
BannerPage.propTypes = {
  data: PropTypes.object
};
BannerPage.defaultProps = {
  data: {}
};
