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
import { validateNumber } from "../../../utils/validateNumberX";
import { actGetListInfo, actUpdateSetupInfo } from "../../../actions/setupinfo.action";
import { Editor } from '@tinymce/tinymce-react';
class SetupInfoUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SetupInfoUpdate: [
        {
          name: "law",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "waitForTheNextQuestion",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "waitForTheAnswer",
          value: "",
          error: false,
          errorMessage: ""
        }
        
      ]
    };

  }


  componentDidMount() {
      this.props.getListInfo();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.listInfoSetup && nextProps.listInfoSetup.data) {
        this.setInfoEdit(nextProps.listInfoSetup.data);
      }
  }

  setInfoEdit = gamedetail => {
    const { SetupInfoUpdate } = this.state;
    SetupInfoUpdate.map(prop => {
      prop.value = gamedetail[prop.name];
      return null;
    });
  }

  handleOnChange = e => {
    const SetupInfoUpdate = this.state.SetupInfoUpdate;
    SetupInfoUpdate.map(prop => {
      if (prop.name === e.target.name) {
        prop.value = e.target.value;
        prop.error = false;
        prop.errorMessage = "";
        return prop;
      }
      return prop;
    });
    this.setState({
      SetupInfoUpdate
    });
  }

  validate = () => {
    const SetupInfoUpdate = this.state.SetupInfoUpdate;
    SetupInfoUpdate.map(prop => {
      if (prop.name === "waitForTheNextQuestion" && !validateNumber(prop.value)) {
        prop.error = true;
        prop.errorMessage = "Phải là số và <= 2 kí tự.";
        this.setState({ SetupInfoUpdate });
      } 
      else if (prop.name === "waitForTheAnswer" && !validateNumber(prop.value)) {
        prop.error = true;
        prop.errorMessage = "Phải là số và <= 2 kí tự.";
        this.setState({ SetupInfoUpdate });
      } 
      else if (prop.value === "" ) {
        prop.error = true;
        prop.errorMessage = "Vui lòng điền thông tin.";
        this.setState({ SetupInfoUpdate });
      }
      return null;
    });
    const result = SetupInfoUpdate.filter(SetupInfoUpdate => SetupInfoUpdate.error === true);
    if (result.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  handleOnSubmit = () => {
    var isValid = this.validate();
    const { SetupInfoUpdate } = this.state;
    if (isValid) {
        this.props.updateSetupInfo(
          SetupInfoUpdate[0].value,
          SetupInfoUpdate[1].value,
          SetupInfoUpdate[2].value,
        )
    }
  }

  render() {
    const { SetupInfoUpdate } = this.state;
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
                      <CardTitle type="h5">Chỉnh sửa thông tin</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>

             
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={SetupInfoUpdate[1].error}
                        errorMessage={SetupInfoUpdate[1].errorMessage}
                        name='waitForTheNextQuestion'
                        value={SetupInfoUpdate[1].value}
                        type="number"
                        label="Thời gian chờ câu hỏi" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={SetupInfoUpdate[2].error}
                        errorMessage={SetupInfoUpdate[2].errorMessage}
                        name='waitForTheAnswer'
                        value={SetupInfoUpdate[2].value}
                        type="number"
                        label="Thời gian chờ câu trả lời" />
                    </Col>
                  </Row>
                  <Row>
                     <Col md="12">    
                    <Label>Luật chơi</Label>
                    <p className="errorMessageUI">{SetupInfoUpdate[0].errorMessage}</p>
                    
                    {/* <CKEditor
                       editor={ DecoupledEditor }
                       data={SetupInfoUpdate[0].value}
                       onInit={ editor => {
                         editor.ui.getEditableElement().parentElement.insertBefore(
                             editor.ui.view.toolbar.element,
                             editor.ui.getEditableElement()
                         );
                     } }
                    onChange={ ( e, editor ) => {
                        const data = editor.getData();
                        const SetupInfoUpdate = this.state.SetupInfoUpdate;
                        SetupInfoUpdate.map(prop => {
                          if (prop.name === "law") {
                            prop.value =data;
                            prop.error = false;
                            prop.errorMessage = "";
                            return prop;
                          }
                          return prop;
                        });
                        this.setState({
                          SetupInfoUpdate
                        });
                    } }
               
                /> */}
                 {SetupInfoUpdate[0].value &&
                       <Editor
                          initialValue={SetupInfoUpdate[0].value}
                          apiKey='yrnx9rhrf39887mo92nv8ijxs8luamymtbxjmr2j62rbu4g7'
                          init={{
                            height: 300,
                            plugins: 'link code lists',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | numlist bullist'
                          }}
                          
                          onChange={ ( e ) => {
                            const data = e.target.getContent();
                            const SetupInfoUpdate = this.state.SetupInfoUpdate;
                            SetupInfoUpdate.map(prop => {
                              if (prop.name === "law") {
                                prop.value =data===""?" ":data;
                                prop.error = false;
                                prop.errorMessage = "";
                                return prop;
                              }
                              return prop;
                            });
                            this.setState({
                              SetupInfoUpdate
                            });
                        } }
                         />
                        }    
                </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-center">
                  <Row>

                    <Col md="12" className="text-right ">
                      <Link to="/admin-page/thong-tin-cai-dat">
                        <Button className="btnExit" simple color="danger" style={{ width: "150px" }}>
                          <i className="fas fa-times" /> Thoát
                                    </Button>
                      </Link>
                      <Button className="btnSave ml-2" simple color="success" onClick={this.handleOnSubmit} style={{ width: "150px" }}>
                        <i className="fas fa-check" />Cập nhật
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
    listInfoSetup: state.setupinfo.listInfoSetup,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListInfo: () => {
        dispatch(actGetListInfo());
      },
      updateSetupInfo: (
          law,
        waitForTheNextQuestion,
        waitForTheAnswer,
        ) => {
        dispatch(actUpdateSetupInfo(  law,
            waitForTheNextQuestion,
            waitForTheAnswer
            ));
      }
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupInfoUpdate);
SetupInfoUpdate.defaultProps = {

};

