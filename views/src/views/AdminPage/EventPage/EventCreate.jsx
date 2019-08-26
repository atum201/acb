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
import { actGetEventByID, actUpdateEventRequest, actCreateEventRequest } from "../../../actions/event.action";
import DateFnsUtils from "@date-io/date-fns";
import viLocale from "date-fns/locale/vi";
import PropTypes from "prop-types";
import { Editor } from '@tinymce/tinymce-react';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import callApi from "utils/callApiCms";

class EventCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: new Date(),
      eventcreate: [
        
        {
          name: "name",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "avatar",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "description",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "start_register",
          value: new Date(),
          error: false,
          errorMessage: ""
        }, 
        {
          name: "end_register",
          value: new Date(),
          error: false,
          errorMessage: ""
        }, 
        {
          name: "start_date",
          value: new Date(),
          error: false,
          errorMessage: ""
        }, 
        {
          name: "end_date",
          value: new Date(),
          error: false,
          errorMessage: ""
        }
      ],
      file: "",
      fileUpload: "",
      isEdit: window.location.pathname.split("/admin-page/")[1] === "sua-event/" + this.props.match.params.event_id
    };
    this.handleFileOnChange = this.handleFileOnChange.bind(this)
  }

  componentDidMount() {
    if (this.state.isEdit === true) {
      this.props.getListEventID(this.props.match.params.event_id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isEdit === true) {
      if (nextProps.listEventDetail && nextProps.listEventDetail.data) {
        this.setEventEdit(nextProps.listEventDetail.data);
        this.setState({
          createdAt:nextProps.listEventDetail.data.createdAt
        })
      }
    }
  }

  setEventEdit = eventdetail => {
    const { eventcreate } = this.state;
    eventcreate.map(prop => {
      prop.value = eventdetail[prop.name];
      return null;
    });
  }

  handleOnChange = e => {
    const {eventcreate,image} = this.state;

    eventcreate.map(prop => {
      if (prop.name === e.target.name) {
        prop.value = e.target.value;
        prop.error = false;
        prop.errorMessage = "";
        return prop;
      }
      return prop;
    });
    this.setState({
      eventcreate
    });
    
  }
  handleFileOnChange = e => {
    
    let img = new FormData();
    img.append("image",e.target.files[0])
    img.append("imgname","ten file anh");
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      fileUpload: img,
    })
  }
  validate = () => {
    const eventcreate = this.state.eventcreate;
    eventcreate.map(prop => {
      if (prop.value === "" && prop.value === "."  ) {
        prop.error = true;
        prop.errorMessage = "Vui lòng điền thông tin.";
        this.setState({ eventcreate });
      }
      return null;
    });
    const result = eventcreate.filter(eventcreate => eventcreate.error === true);
    if (result.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  handleOnSubmit = () => {
    var isValid = this.validate();
    const { eventcreate,createdAt,fileUpload } = this.state;
    if (isValid) {
      if (this.state.isEdit === true) {
        this.props.updateEventRequest(
          this.props.match.params.event_id,
          ...eventcreate.map(a => a.value),
          createdAt,
          fileUpload
        );
      } else {
        this.props.createEventRequest(
          ...eventcreate.map(a => a.value),
          createdAt,
          fileUpload
        );
      }

    }
  }
  _handleOnChangeStartRegister = date => {
    const { eventcreate } = this.state;
    eventcreate[3].value = new Date(date);
    this.setState({
      eventcreate
    });
  };
  _handleOnChangeEndRegister = date => {
    const { eventcreate } = this.state;
    eventcreate[4].value = new Date(date);
    this.setState({
      eventcreate
    });
  };
  _handleOnChangeStartDate = date => {
    const { eventcreate } = this.state;
    eventcreate[5].value = new Date(date);
    this.setState({
      eventcreate
    });
  };
  _handleOnChangeEndDate = date => {
    const { eventcreate } = this.state;
    eventcreate[6].value = new Date(date);
    this.setState({
      eventcreate
    });
  };
  _handleOnChangeDateCreate = date => {
    // let convertD = formatStringToTime(date);
    this.setState({
      createdAt: new Date(date)
    });
  };

  render() {
    const { eventcreate, isEdit, createdAt,file } = this.state;
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
                      <CardTitle type="h5">{isEdit === true ? "Chỉnh sửa event" : "Thêm event mới"}</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={eventcreate[0].error}
                        errorMessage={eventcreate[0].errorMessage}
                        name='name'
                        value={eventcreate[0].value}
                        label="Tên" />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md="6">
                      <Label>Ảnh </Label>
                      <Input onChange={this.handleFileOnChange} type="file"/>
                    </Col>
                    <Col md="6">
                      <img src={eventcreate[1].value||file} height="80" />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md="6">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                        <div className="picker">
                          <DateTimePicker
                            value={eventcreate[3].value}
                            ampm={false}
                            onChange={this._handleOnChangeStartRegister}
                            label="Bắt đầu đăng ký"
                            showTodayButton
                            format="yyyy/MM/dd hh:mm"
                          />
                        </div>
                      </MuiPickersUtilsProvider>
                    </Col>
                    <Col md="6">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                        <div className="picker">
                          <DateTimePicker
                            value={eventcreate[4].value}
                            ampm={false}
                            onChange={this._handleOnChangeEndRegister}
                            label="Kết thúc đăng ký"
                            showTodayButton
                            format="yyyy/MM/dd hh:mm"
                          />
                        </div>
                      </MuiPickersUtilsProvider>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md="6">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                        <div className="picker">
                          <DateTimePicker
                            value={eventcreate[5].value}
                            ampm={false}
                            onChange={this._handleOnChangeStartDate}
                            label="Thời gian bắt đầu"
                            showTodayButton
                            format="yyyy/MM/dd hh:mm"
                          />
                        </div>
                      </MuiPickersUtilsProvider>
                    </Col>
                    <Col md="6">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                        <div className="picker">
                          <DateTimePicker
                            value={eventcreate[6].value}
                            ampm={false}
                            onChange={this._handleOnChangeEndDate}
                            label="Thời gian kết thúc"
                            showTodayButton
                            format="yyyy/MM/dd hh:mm"
                          />
                        </div>
                      </MuiPickersUtilsProvider>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                        <Label>Giới thiệu</Label>
                        <p className="errorMessageUI">{eventcreate[2].errorMessage}</p>
                        {isEdit&&eventcreate[2].value &&
                          <Editor
                          initialValue={eventcreate[2].value}
                          apiKey='yrnx9rhrf39887mo92nv8ijxs8luamymtbxjmr2j62rbu4g7'
                          init={{
                            height: 300,
                            plugins: 'link code lists',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | numlist bullist'
                          }}
                          
                          onChange={ ( e ) => {
                            const data = e.target.getContent();
                            const eventcreate = this.state.eventcreate;
                            eventcreate.map(prop => {
                              if (prop.name === "description") {
                                prop.value =data===""?" ":data;
                                prop.error = false;
                                prop.errorMessage = "";
                                return prop;
                              }
                              return prop;
                            });
                            this.setState({
                              eventcreate
                            });
                        } }
                         />
                        }                       
                        {!isEdit&&
                          <Editor
                          initialValue={eventcreate[2].value}
                          apiKey='yrnx9rhrf39887mo92nv8ijxs8luamymtbxjmr2j62rbu4g7'
                          init={{
                            plugins: 'link code lists',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | numlist bullist'
                          }}
                          onChange={ ( e ) => {
                            const data = e.target.getContent();
                            const eventcreate = this.state.eventcreate;
                            eventcreate.map(prop => {
                              if (prop.name === "description") {
                                prop.value =data;
                                prop.error = false;
                                prop.errorMessage = "";
                                return prop;
                              }
                              return prop;
                            });
                            this.setState({
                              eventcreate
                            });
                        } }
                         />
                        }                       
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md="12">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                        <div className="picker">
                          <DateTimePicker
                            value={createdAt}
                            ampm={false}
                            onChange={this._handleOnChangeDateCreate}
                            label="Ngày tạo sự kiện"
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
                      <Link to="/admin-page/danh-sach-event/">
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
    listEventDetail: state.eventReducer.eventDetail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEventRequest: (
      name, avatar, description, start_register, end_register, start_date, end_date, createdAt,file
    ) => {
      dispatch(
        actCreateEventRequest(
          name, avatar, description, start_register, end_register, start_date, end_date, createdAt,file
        )
      );
    },
    updateEventRequest: (
      event_id, name, avatar, description, start_register, end_register, start_date, end_date, createdAt,file
    ) => {
      dispatch(
        actUpdateEventRequest(
          event_id, name, avatar, description, start_register, end_register, start_date, end_date, createdAt,file
        )
      );
    },
    getListEventID: (id) => {
      dispatch(
        actGetEventByID(id)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCreate);
EventCreate.propTypes = {
  eventcreate: PropTypes.object
};
