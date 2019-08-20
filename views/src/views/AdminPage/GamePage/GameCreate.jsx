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
  Label
} from "reactstrap";
import { PanelHeader, MaterialInputText, Button } from "components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { validateNumberBonus } from "../../../utils/validateNumberX";
import { actGetListGameID, actUpdateGameRequest, actCreateGameRequest } from "../../../actions/game.action";
import DateFnsUtils from "@date-io/date-fns";
import viLocale from "date-fns/locale/vi";
import PropTypes from "prop-types";
import { Editor } from '@tinymce/tinymce-react';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

class GameCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdeD: new Date(),
      gamecreate: [
        {
          name: "name",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "bonus",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "recommend",
          value: "",
          error: false,
          errorMessage: ""
        }
        
      ],
      isEdit: window.location.pathname.split("/admin-page/")[1] === "sua-tro-choi/" + this.props.match.params.id
    };

  }


  componentDidMount() {
    if (this.state.isEdit === true) {
      this.props.getListGameID(this.props.match.params.id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isEdit === true) {
      if (nextProps.listGameDetail && nextProps.listGameDetail.data) {
        this.setGameEdit(nextProps.listGameDetail.data);
        this.setState({
          createdeD:nextProps.listGameDetail.data.start_date
        })
      }
    }
  }

  setGameEdit = gamedetail => {
    const { gamecreate } = this.state;
    gamecreate.map(prop => {
      prop.value = gamedetail[prop.name];
      return null;
    });
  }

  handleOnChange = e => {
    const gamecreate = this.state.gamecreate;
    gamecreate.map(prop => {
      if (prop.name === e.target.name) {
        prop.value = e.target.value;
        prop.error = false;
        prop.errorMessage = "";
        return prop;
      }
      return prop;
    });
    this.setState({
      gamecreate
    });
  }

  validate = () => {
    const gamecreate = this.state.gamecreate;
    gamecreate.map(prop => {
      if (prop.name === "bonus" && !validateNumberBonus(prop.value)) {
        prop.error = true;
        prop.errorMessage = "Thông tin không hợp lệ (bắt buộc phải là số).";
        this.setState({ gamecreate });
      } else if (prop.value === "" && prop.value === "."  ) {
        prop.error = true;
        prop.errorMessage = "Vui lòng điền thông tin.";
        this.setState({ gamecreate });
      }
      return null;
    });
    const result = gamecreate.filter(gamecreate => gamecreate.error === true);
    if (result.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  handleOnSubmit = () => {
    var isValid = this.validate();
    const { gamecreate,createdeD } = this.state;
    if (isValid) {
      if (this.state.isEdit === true) {
        this.props.updateGameRequest(
          this.props.match.params.id,
          gamecreate[0].value,
          gamecreate[1].value,
          gamecreate[2].value,
          createdeD
        );
      } else {
        this.props.createGameRequest(
          gamecreate[0].value,
          gamecreate[1].value,
          gamecreate[2].value,
          createdeD
        );
      }

    }
  }
  _handleOnChangeDatestart = date => {
    // let convertD = formatStringToTime(date);
    this.setState({
      createdeD: new Date(date)
    });
  };
  render() {
    const { gamecreate, isEdit, createdeD } = this.state;
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
                      <CardTitle type="h5">{isEdit === true ? "Chỉnh sửa game" : "Thêm game mới"}</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={gamecreate[0].error}
                        errorMessage={gamecreate[0].errorMessage}
                        name='name'
                        value={gamecreate[0].value}
                        label="Tên" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={gamecreate[1].error}
                        errorMessage={gamecreate[1].errorMessage}
                        name='bonus'
                        value={gamecreate[1].value}
                        label="Tiền thưởng" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                        <Label>Gợi ý</Label>
                        <p className="errorMessageUI">{gamecreate[2].errorMessage}</p>
                        {isEdit&&gamecreate[2].value &&
                          <Editor
                          initialValue={gamecreate[2].value}
                          apiKey='yrnx9rhrf39887mo92nv8ijxs8luamymtbxjmr2j62rbu4g7'
                          init={{
                            height: 300,
                            plugins: 'link code lists',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | numlist bullist'
                          }}
                          
                          onChange={ ( e ) => {
                            const data = e.target.getContent();
                            const gamecreate = this.state.gamecreate;
                            gamecreate.map(prop => {
                              if (prop.name === "recommend") {
                                prop.value =data===""?" ":data;
                                prop.error = false;
                                prop.errorMessage = "";
                                return prop;
                              }
                              return prop;
                            });
                            this.setState({
                              gamecreate
                            });
                        } }
                         />
                        }                       
                        {!isEdit&&
                          <Editor
                          initialValue={gamecreate[2].value}
                          apiKey='yrnx9rhrf39887mo92nv8ijxs8luamymtbxjmr2j62rbu4g7'
                          init={{
                            plugins: 'link code lists',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | numlist bullist'
                          }}
                          onChange={ ( e ) => {
                            const data = e.target.getContent();
                            const gamecreate = this.state.gamecreate;
                            gamecreate.map(prop => {
                              if (prop.name === "recommend") {
                                prop.value =data;
                                prop.error = false;
                                prop.errorMessage = "";
                                return prop;
                              }
                              return prop;
                            });
                            this.setState({
                              gamecreate
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
                            value={createdeD}
                            disablePast
                            ampm={false}
                            onChange={this._handleOnChangeDatestart}
                            label="Thời gian bắt đầu"
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
                      <Link to="/admin-page/danh-sach-tro-choi/">
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
    listGameDetail: state.gameReducer.gameDetail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGameRequest: (
      name, bonus, recommend, start_date
    ) => {
      dispatch(
        actCreateGameRequest(
          name, bonus, recommend, start_date
        )
      );
    },
    updateGameRequest: (
      id, name, bonus, recommend, start_date
    ) => {
      dispatch(
        actUpdateGameRequest(
          id, name, bonus, recommend, start_date
        )
      );
    },
    getListGameID: (id) => {
      dispatch(
        actGetListGameID(id)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameCreate);
GameCreate.propTypes = {
  gamecreate: PropTypes.object
};
