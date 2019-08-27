/* eslint-disable prettier/prettier */
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
import { actGetListBannerID, actUpdateBannerRequest, actCreateBannerRequest } from "../../../actions/banner.action";
import DateFnsUtils from "@date-io/date-fns";
import viLocale from "date-fns/locale/vi";
import PropTypes from "prop-types";
import { Editor } from '@tinymce/tinymce-react';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import callApi from "utils/callApiCms";

class BannerCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: new Date(),
      bannercreate: [
        {
          name: "name",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "code",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "link",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "img",
          value: "",
          error: false,
          errorMessage: ""
        }
        
      ],
      file: "",
      fileUpload: "",
      isEdit: window.location.pathname.split("/admin-page/")[1] === "sua-banner/" + this.props.match.params.banner_id
    };
    this.handleFileOnChange = this.handleFileOnChange.bind(this)
  }


  componentDidMount() {
    if (this.state.isEdit === true) {
      this.props.getListBannerID(this.props.match.params.banner_id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isEdit === true) {
      if (nextProps.listBannerDetail && nextProps.listBannerDetail.data) {
        this.setBannerEdit(nextProps.listBannerDetail.data);
        this.setState({
          createdAt:nextProps.listBannerDetail.data.createdAt
        })
      }
    }
  }

  setBannerEdit = bannerdetail => {
    const { bannercreate } = this.state;
    bannercreate.map(prop => {
      prop.value = bannerdetail[prop.name];
      return null;
    });
  }

  handleOnChange = e => {
    const {bannercreate,image} = this.state;

    bannercreate.map(prop => {
      if (prop.name === e.target.name) {
        prop.value = e.target.value;
        prop.error = false;
        prop.errorMessage = "";
        return prop;
      }
      return prop;
    });
    this.setState({
      bannercreate
    });
    
  }
  handleFileOnChange = e => {
    
    let img = new FormData();
    img.append("image",e.target.files[0])
    // img.append("imgname","ten file anh");
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      fileUpload: img,
    })
  }
  validate = () => {
    const bannercreate = this.state.bannercreate;
    bannercreate.map(prop => {
      if (prop.value === "" && prop.value === "."  ) {
        prop.error = true;
        prop.errorMessage = "Vui lòng điền thông tin.";
        this.setState({ bannercreate });
      }
      return null;
    });
    const result = bannercreate.filter(bannercreate => bannercreate.error === true);
    if (result.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  handleOnSubmit = () => {
    var isValid = this.validate();
    const { bannercreate,createdAt,fileUpload } = this.state;
    if (isValid) {
      if (this.state.isEdit === true) {
        this.props.updateBannerRequest(
          this.props.match.params.banner_id,
          ...bannercreate.map(a => a.value),
          createdAt,
          fileUpload
        );
      } else {
        this.props.createBannerRequest(
          ...bannercreate.map(a => a.value),
          createdAt,
          fileUpload
        );
      }

    }
  }
  _handleOnChangeDatestart = date => {
    this.setState({
      createdAt: new Date(date)
    });
  };
  render() {
    const { bannercreate, isEdit, createdAt,file } = this.state;
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
                      <CardTitle type="h5">{isEdit === true ? "Chỉnh sửa banner" : "Thêm banner mới"}</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={bannercreate[0].error}
                        errorMessage={bannercreate[0].errorMessage}
                        name='name'
                        value={bannercreate[0].value}
                        label="Tên" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={bannercreate[1].error}
                        errorMessage={bannercreate[1].errorMessage}
                        name='code'
                        value={bannercreate[1].value}
                        label="Code" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={bannercreate[2].error}
                        errorMessage={bannercreate[2].errorMessage}
                        name='link'
                        value={bannercreate[2].value}
                        label="Link" />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md="6">
                      <Label>Ảnh banner</Label>
                      <Input onChange={this.handleFileOnChange} type="file"/>
                    </Col>
                    <Col md="6">
                      <img src={bannercreate[3].value||file} height="80" />
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
                      <Link to="/admin-page/danh-sach-banner/">
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
    listBannerDetail: state.bannerReducer.bannerDetail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createBannerRequest: (
      name, code, link, img, createdAt,file
    ) => {
      dispatch(
        actCreateBannerRequest(
          name, code, link, img, createdAt,file
        )
      );
    },
    updateBannerRequest: (
      banner_id, name, code, link, img, createdAt,file
    ) => {
      dispatch(
        actUpdateBannerRequest(
          banner_id, name, code, link, img, createdAt,file
        )
      );
    },
    getListBannerID: (id) => {
      dispatch(
        actGetListBannerID(id)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerCreate);
BannerCreate.propTypes = {
  bannercreate: PropTypes.object
};
