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
import { actGetListEnterprise, actDeleteEnterpriseRequest } from "../../../actions/enterprise.action";
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
class EnterprisePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      openning: false,
      page:1
    };
    this.getListEnterprisePagging = this.getListEnterprisePagging.bind(this);
  }
  componentDidMount() {
  	const page = getUrlParam()["page"];
    this.getListEnterprise({page});
  }
  getListEnterprisePagging(value) {
  	const page = value;
    this.getListEnterprise({page});
  }
  getListEnterprise(query) {
    this.props.getListEnterprise(query);
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
    this.props.deleteEnterprise(e);
  }
  _hideAlert(){
  	const page = getUrlParam()["page"];
    this.props.getListEnterprise();
    this.setState({ alert: "" });
  };
  render() {
    const { listEnterprises } = this.props;
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
              <CardTitle type="h5">Danh sách doanh nghiệp</CardTitle>
              <Row>
                <Col md={"3"} />
                <Col md={"3"} />
                <Col md={"3"} />
                <Col className={"text-right"} md={{ size: 3 }}>
                  <Link to="/admin-page/them-enterprise">
                    <Button
                      simple
                      style={{ width: "200px" }}
                      className="btn-customadd"
                    >
                      <i className="fas fa-gamepad" /> Tạo doanh nghiệp
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
                      <span>Địa chỉ</span>
                    </th>
                    <th>
                      <span>Email</span>
                    </th>
                    <th>
                      <span>Ảnh</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  { listEnterprises.data && Object.keys(listEnterprises).length > 0 &&
                    listEnterprises.data.docs.map((props, key) => {
                      return (
                        <tr key={key}>
                          <td>{props.name}</td>
                          <td> {props.address} </td>
                          <td> {props.email}</td>
                          <td> <img src={props.icon} height="80"/></td>
                          <td className="text-right">
                            <Link
                              to={"/admin-page/sua-enterprise/" + props.enterprise_id}
                            >
                              <Button className="btn-simple btn-icon btn btn-info btn-sm">
                                <i className="fas fa-pen" />
                              </Button>
                            </Link>
                            <Button className="btn-simple btn-icon btn btn-info btn-sm" onClick={()=> this.handleDelete(props.enterprise_id)}>
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
                page={listEnterprises.data ? listEnterprises.data.page : 1}
                totalPages={listEnterprises.data ? listEnterprises.data.totalPages : 1}
                getListByPage={this.getListEnterprisePagging}
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
    listEnterprises: state.enterpriseReducer.listEnterprise
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListEnterprise: (query) => {
      query = query || {page:1}
      console.log(query)
      dispatch(actGetListEnterprise(query));
    },
    deleteEnterprise: (enterprise_id)=>{
      dispatch(actDeleteEnterpriseRequest(enterprise_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterprisePage);
EnterprisePage.propTypes = {
  data: PropTypes.object
};
EnterprisePage.defaultProps = {
  data: {}
};

