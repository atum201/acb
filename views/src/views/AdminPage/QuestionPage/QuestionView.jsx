import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Label,
  Container
} from "reactstrap";
import { Button } from "components";
import { PanelHeader } from "components";
import PropsType from "prop-types";
import { connect } from "react-redux";
import { actGetListQuestionID } from "../../../actions/question.action";
import { formatStringToDate } from "../../../utils/formatDate";
class QuestionView extends Component {
  componentDidMount() {
    this._getListQuestionID();
  }
  _getListQuestionID = () => {
    this.props.getListQuestionID(this.props.match.params.id);
  };

  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { listQuestionDetail } = this.props;
    return (
      <React.Fragment>
        <Container>
          <PanelHeader size="sm" />
          <div className="content">
            <Card className="card-QuestionView">
              <CardBody>
                <CardTitle title="h5">Xem chi tiết câu hỏi</CardTitle>
                <Row className="announ-header">
                  <Col xs={6}>
                    <Label>Game_ID</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.game_id
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Câu số :</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.ordinalNumber
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Câu hỏi :</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.title
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Số người trả lời sai :</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.wrongQuantity
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Số người trả lời đúng :</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.rightQuantity
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Gợi ý:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.explain
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Đáp án A:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.answerA
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Đáp án B:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.answerB
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Đáp án C:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.answerC
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Đáp án D:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.answerD
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Câu trả lời đúng:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.rightAnswer
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Số người chọn câu A:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.peopleSelectA
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Số người chọn câu B:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.peopleSelectB
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Số người chọn câu C:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.peopleSelectC
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Số người chọn câu D:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? listQuestionDetail.data.peopleSelectD
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Ngày tạo:</Label>
                    <p>
                      {listQuestionDetail.data
                        ? formatStringToDate(listQuestionDetail.data.createdAt)
                        : ""}
                    </p>
                  </Col>
                </Row>
                <div className="button-container text-center">
                  <Button className="btn_done" simple onClick={this.goBack}>
                    <i className="fas fa-check" /> &nbsp; Hoàn tất
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    listQuestionDetail: state.question.questionDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListQuestionID: id => {
      dispatch(actGetListQuestionID(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionView);
QuestionView.propTypes = {
  expenditure: PropsType.object,
  getExpenditureID: PropsType.func,
  match: PropsType.object
};
QuestionView.defaultProps = {
  listQuestionDetail: {
    data: {}
  }
};
