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
  FormGroup,Label,Input
} from "reactstrap";
import { PanelHeader, MaterialInputText, Button } from "components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { validateNumberQuestion } from "../../../utils/validateNumberX";
import { actUpdateQuestionRequest, actCreateQuestionRequest, actGetListQuestionID } from "../../../actions/question.action";
// import convertDate from "../../../utils/convertDate";
class QuestionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightAnswer:"A",
      QuestionCreate: [
        {
          name: "game_id",
          value: this.props.match.params.id,
          error: false,
          errorMessage: ""
        },
        {
          name: "ordinalNumber",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "title",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "answerA",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "answerB",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "answerC",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "answerD",
          value: "",
          error: false,
          errorMessage: ""
        },
        {
          name: "explain",
          value: "",
          error: false,
          errorMessage: ""
        }
        
      ],
      isEdit: window.location.pathname.split("/admin-page/")[1] === "sua-cau-hoi/" + this.props.match.params.id
    };

  }


  componentDidMount() {
    if (this.state.isEdit === true) {
      this.props.getListQuestionID(this.props.match.params.id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isEdit === true) {
      if (nextProps.listQuestionDetail && nextProps.listQuestionDetail.data) {
        this.setQuestionEdit(nextProps.listQuestionDetail.data);
        this.setQuestionRightAnser(nextProps.listQuestionDetail.data);
      }
    }
  }

  setQuestionEdit = gamedetail => {
    const { QuestionCreate } = this.state;
    QuestionCreate.map(prop => {
      prop.value = gamedetail[prop.name];
      return null;
    });
  }

  setQuestionRightAnser = gamedetail => {
    if(gamedetail){
    this.setState({
      rightAnswer:gamedetail.rightAnswer
    })
  }

  }

  handleOnChange = e => {
    const QuestionCreate = this.state.QuestionCreate;
    QuestionCreate.map(prop => {
      if (prop.name === e.target.name) {
        prop.value = e.target.value;
        prop.error = false;
        prop.errorMessage = "";
        return prop;
      }
      return prop;
    });
    this.setState({
      QuestionCreate
    });
  }

  validate = () => {
    const QuestionCreate = this.state.QuestionCreate;
    QuestionCreate.map(prop => {
      if (prop.name === "ordinalNumber" && !validateNumberQuestion(prop.value)) {
        prop.error = true;
        prop.errorMessage = "Thông tin hợp lệ(điền số thứ tự câu 1-10).";
        this.setState({ QuestionCreate });
      } else if (prop.value === "") {
        prop.error = true;
        prop.errorMessage = "Vui lòng điền thông tin.";
        this.setState({ QuestionCreate });
      }
      return null;
    });
    const result = QuestionCreate.filter(QuestionCreate => QuestionCreate.error === true);
    if (result.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  handleOnSubmit = () => {
    var isValid = this.validate();
    const { QuestionCreate ,rightAnswer} = this.state;
    if (isValid) {
      // name, email, phone, address, working_time, description, images, status
      if (this.state.isEdit === true) {
        this.props.updateQuestionRequest(
          this.props.match.params.id,
          QuestionCreate[0].value,
          QuestionCreate[1].value,
          QuestionCreate[2].value,
          QuestionCreate[3].value,
          QuestionCreate[4].value,
          QuestionCreate[5].value,
          QuestionCreate[6].value,
          QuestionCreate[7].value,
          rightAnswer
        );
      } else {
        this.props.createQuestionRequest(
            QuestionCreate[0].value,
            QuestionCreate[1].value,
            QuestionCreate[2].value,
            QuestionCreate[3].value,
            QuestionCreate[4].value,
            QuestionCreate[5].value,
            QuestionCreate[6].value,
            QuestionCreate[7].value,
            rightAnswer
        );
      }

    }
  }
  handleAnswer = event => {
    this.setState({
      rightAnswer: event.target.value,
    });
  };

  render() {
    const { QuestionCreate, isEdit ,rightAnswer} = this.state;
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content ">
          <Row>
            <Col md="7" xs="12" className="m-auto">
              <Card className="card-staff card-form-staff card-announcement-new">
                <CardHeader>
                  <Row>
                    <Col md="8" xs="9">
                      <CardTitle type="h5">{isEdit === true ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi mới"}</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={QuestionCreate[0].error}
                        errorMessage={QuestionCreate[0].errorMessage}
                        name='game_id'
                        disabled
                        value={QuestionCreate[0].value}
                        label="Game ID" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={QuestionCreate[1].error}
                        errorMessage={QuestionCreate[1].errorMessage}
                        name='ordinalNumber'
                        type="number"
                        value={QuestionCreate[1].value}
                        label="Câu số" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={QuestionCreate[2].error}
                        errorMessage={QuestionCreate[2].errorMessage}
                        name='title'
                        multiline
                        value={QuestionCreate[2].value}
                        label="Câu hỏi" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={QuestionCreate[3].error}
                        errorMessage={QuestionCreate[3].errorMessage}
                        name='answerA'
                        value={QuestionCreate[3].value}
                        label="Đáp Án A" />
                    </Col>
                    </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={QuestionCreate[4].error}
                        errorMessage={QuestionCreate[4].errorMessage}
                        name='answerB'
                        value={QuestionCreate[4].value}
                        label="Đáp Án B" />
                    </Col>
                    </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={QuestionCreate[5].error}
                        errorMessage={QuestionCreate[5].errorMessage}
                        name='answerC'
                        value={QuestionCreate[5].value}
                        label="Đáp Án C" />
                    </Col>
                    </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={QuestionCreate[6].error}
                        errorMessage={QuestionCreate[6].errorMessage}
                        name='answerD'
                        value={QuestionCreate[6].value}
                        label="Đáp Án D" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={QuestionCreate[7].error}
                        errorMessage={QuestionCreate[7].errorMessage}
                        name='explain'
                        value={QuestionCreate[7].value}
                        multiline
                        label="Giải thích câu hỏi" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                    <FormGroup>
                    <Label for="inputAnswer">Chọn đáp án đúng</Label>
                    <Input type="select" name="select" onChange={this.handleAnswer}  value = {rightAnswer} id="inputAnswer">
                      <option value="A" >A</option>
                      <option value="B" >B</option>
                      <option value="C" >C</option>
                      <option value="D">D</option>
                    </Input>
                  </FormGroup>
                      {/* <MaterialInputText
                        onChange={this.handleOnChange}
                        error={QuestionCreate[8].error}
                        errorMessage={QuestionCreate[8].errorMessage}
                        name='rightAnswer'
                        value={QuestionCreate[8].value}
                        label="Câu trả lời đúng" /> */}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-center">
                  <Row>

                    <Col md="12" className="text-right ">
                      <Link to={"/admin-page/danh-sach-cau-hoi/"+QuestionCreate[0].value}>
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
    listQuestionDetail: state.question.questionDetail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createQuestionRequest: (
        game_id,
        ordinalNumber,
        title,
        answerA,
        answerB,
        answerC,
        answerD,
        explain,
        rightAnswer
    ) => {
      dispatch(
        actCreateQuestionRequest(
            game_id,
            ordinalNumber,
            title,
            answerA,
            answerB,
            answerC,
            answerD,
            explain,
            rightAnswer
        )
      );
    },
    updateQuestionRequest: (
        id,
        game_id,
        ordinalNumber,
        title,
        answerA,
        answerB,
        answerC,
        answerD,
        explain,
        rightAnswer
    ) => {
      dispatch(
        actUpdateQuestionRequest(
            id,
            game_id,
            ordinalNumber,
            title,
            answerA,
            answerB,
            answerC,
            answerD,
            explain,
            rightAnswer
        )
      );
    },
    getListQuestionID: (id) => {
      dispatch(
        actGetListQuestionID(id)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCreate);
QuestionCreate.defaultProps = {

};

