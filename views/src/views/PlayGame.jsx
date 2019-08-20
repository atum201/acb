import React, { Component } from "react";
import { socketGlobal } from "../utils/instanceSocket";
import { FormGroup, Label, Input } from "reactstrap";

class PlayGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      secondWaitTheQuestion: 0,
      secondWaitTheAnswer: 0,
      waitTheQuestion: false,
      waitTheAnswer: false,
      finishGame: false,
      peopleOnline: 0,
      currentPlayer: 0,
      answer: "",
      lose: false,
      rightQuantity: 0,
      wrongQuantity: 0,
      waitTheLastQuestionPart1: false,
      waitTheLastQuestionPart2: false,
      waitTheLastQuestionPart3: false,
      secondWaitTheLastQuestionPart3: 0
    };
    
    socketGlobal.on("kickForLogin2Account", result => {
      if (result.success)
        this.setState({
          kick: result.success
        });
    });

    socketGlobal.on("waitTheNextQuestion", second => {
      this.setState({
        secondWaitTheQuestion: second,
        waitTheQuestion: true,
        waitTheAnswer: false,
        answer: ""
      });
    });

    socketGlobal.on("waitTheAnswer", second => {
      this.setState({
        secondWaitTheAnswer: second,
        waitTheAnswer: true,
        waitTheQuestion: false
      });
    });

    socketGlobal.on("waitTheLastQuestionPart1", second => {
      this.setState({
        waitTheLastQuestionPart1: true,
        waitTheLastQuestionPart2: false,
        waitTheLastQuestionPart3: false,
        waitTheQuestion: false,
        waitTheAnswer: false
      });
    });

    socketGlobal.on("waitTheLastQuestionPart2", second => {
      this.setState({
        waitTheLastQuestionPart1: false,
        waitTheLastQuestionPart2: true,
        waitTheLastQuestionPart3: false,
        waitTheQuestion: false,
        waitTheAnswer: false
      });
    });

    socketGlobal.on("waitTheLastQuestionPart3", second => {
      this.setState({
        waitTheLastQuestionPart1: false,
        waitTheLastQuestionPart2: false,
        waitTheLastQuestionPart3: true,
        waitTheQuestion: false,
        waitTheAnswer: false,
        secondWaitTheLastQuestionPart3: second
      });
    });

    socketGlobal.on("responseQuestion", question => {
      if (question.success) {
        this.setState({
          question: question.data,
          rightQuantity: 0,
          wrongQuantity: 0,
          waitTheLastQuestionPart3: false
        });
      } else console.log(question.message);
    });

    socketGlobal.on("peopleOnline", quantity => {
      this.setState({
        peopleOnline: quantity
      });
    });

    socketGlobal.on("countCurrentPlayer", result => {
      if (result.success)
        this.setState({
          currentPlayer: result.count
        });
    });

    socketGlobal.on("waitTheNextQuestion", second => {
      this.setState({
        secondWaitTheQuestion: second,
        waitTheQuestion: true,
        waitTheAnswer: false,
        answer: ""
      });
    });

    socketGlobal.on("youWin", result => {
      if (result.success) console.log(result.data);
    });

    socketGlobal.on("responseResult", result => {
      if (!result.success) return;

      const { ordinalNumber, rightAnswer } = result.data;
      if (ordinalNumber === this.state.question.ordinalNumber) {
        let dataSend = {};
        const token = localStorage.getItem("access_token");
        if (rightAnswer === this.state.answer) {
          dataSend = {
            event: "sendTheResult",
            token,
            ordinalNumber,
            isRightAnswer: true
          };
        } else {
          dataSend = {
            event: "sendTheResult",
            token,
            ordinalNumber,
            isRightAnswer: false
          };

          this.setState({
            lose: true,
            waitTheAnswer: false,
            waitTheQuestion: false
          });
        }

        socketGlobal.emit("process", dataSend);
      }
    });

    socketGlobal.on("quantityRightWrongAnswer", result => {
      if (result.success) {
        const { rightQuantity, wrongQuantity } = result.quantity;
        this.setState({
          rightQuantity,
          wrongQuantity
        });
      }
    });

    socketGlobal.on("finishGame", () => {
      this.setState({
        waitTheQuestion: false,
        waitTheAnswer: false,
        finishGame: true
      });
    });
  }

  handleOptionChange = changeEvent => {
    this.setState({
      answer: changeEvent.target.value
    });
  };

  render() {
    let question = this.state.question;
    let waitTheQuestion = this.state.waitTheQuestion;
    let waitTheAnswer = this.state.waitTheAnswer;
    let secondWaitTheQuestion = this.state.secondWaitTheQuestion;
    let secondWaitTheAnswer = this.state.secondWaitTheAnswer;
    let finishGame = this.state.finishGame;
    let peopleOnline = this.state.peopleOnline;
    let lose = this.state.lose;
    let rightQuantity = this.state.rightQuantity;
    let wrongQuantity = this.state.wrongQuantity;
    let currentPlayer = this.state.currentPlayer;
    let waitTheLastQuestionPart1 = this.state.waitTheLastQuestionPart1;
    let waitTheLastQuestionPart2 = this.state.waitTheLastQuestionPart2;
    let waitTheLastQuestionPart3 = this.state.waitTheLastQuestionPart3;
    let secondWaitTheLastQuestionPart3 = this.state.secondWaitTheLastQuestionPart3;
    let kick = this.state.kick;

    if (question) {
      return (
        <div>
          {kick ? (
            <div>
              <div>Tài khoản của bạn đã đăng nhập ở 1 nơi khác</div>
            </div>
          ) : (
              ""
            )}
          {!kick && lose ? (
            <div>Bạn đã thua... Bạn có muốn tiếp tục theo dõi game không</div>
          ) : (
            ""
          )}
          {waitTheLastQuestionPart1 ? (
            <div>
              Bạn đã sẵn sàng để trở thành một trong những người chiến thắng
              chưa?
            </div>
          ) : (
            ""
          )}
          {waitTheLastQuestionPart2 ? (
            <div>Câu hỏi chiến thắng sẽ bắt đầu trong ...</div>
          ) : (
            ""
          )}
          {waitTheLastQuestionPart3 ? (
            <div>{secondWaitTheLastQuestionPart3}s</div>
          ) : (
            ""
          )}
          {waitTheQuestion && !lose ? (
            <div>
              <div>
                Câu hỏi tiếp theo sẽ tiếp tục trong {secondWaitTheQuestion}s
              </div>
              <div>
                Tổng số người đang online: {peopleOnline ? peopleOnline : 0}{" "}
              </div>
              <div>
                Số người trả lời đúng: {rightQuantity ? rightQuantity : 0}{" "}
              </div>
              <div>
                Số người trả lời sai: {wrongQuantity ? wrongQuantity : 0}{" "}
              </div>
            </div>
          ) : (
            ""
          )}
          {waitTheAnswer && !lose ? (
            <div>
              <div>Thời gian còn lại {secondWaitTheAnswer}s</div>
              <div>
                <div>
                  <div>
                    Number:{" "}
                    {question.ordinalNumber ? question.ordinalNumber : ""}{" "}
                  </div>
                  <div>Title: {question.title ? question.title : ""} </div>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        value="A"
                        checked={this.state.answer === "A"}
                        onChange={this.handleOptionChange}
                      />{" "}
                      Question A: {question.answerA ? question.answerA : ""}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        value="B"
                        checked={this.state.answer === "B"}
                        onChange={this.handleOptionChange}
                      />{" "}
                      Question B: {question.answerB ? question.answerB : ""}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        value="C"
                        checked={this.state.answer === "C"}
                        onChange={this.handleOptionChange}
                      />{" "}
                      Question C: {question.answerC ? question.answerC : ""}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        value="D"
                        checked={this.state.answer === "D"}
                        onChange={this.handleOptionChange}
                      />{" "}
                      Question D: {question.answerD ? question.answerD : ""}
                    </Label>
                  </FormGroup>
                </div>
                <div>
                  Tổng số người đang online: {peopleOnline ? peopleOnline : 0}{" "}
                </div>
                <div>
                  Số người đang chơi: {currentPlayer ? currentPlayer : 0}{" "}
                </div>
                <div>
                  Số người trả lời đúng: {rightQuantity ? rightQuantity : 0}{" "}
                </div>
                <div>
                  Số người trả lời sai: {wrongQuantity ? wrongQuantity : 0}{" "}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {finishGame && !lose ? <div>Game đã kết thúc</div> : ""}
          {/* {
          waitTheAnswer && !lose ? (
            <div>
              <div>
                <div>
                  Number: {question.ordinalNumber ? question.ordinalNumber : ""}{" "}
                </div>
                <div>Title: {question.title ? question.title : ""} </div>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      value="A"
                      checked={this.state.answer === "A"}
                      onChange={this.handleOptionChange}
                    />{" "}
                    Question A: {question.answerA ? question.answerA : ""}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" value="B" checked={this.state.answer === "B"} onChange={this.handleOptionChange} /> Question B:{" "}
                    {question.answerB ? question.answerB : ""}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" value="C" checked={this.state.answer === "C"} onChange={this.handleOptionChange} /> Question C:{" "}
                    {question.answerC ? question.answerC : ""}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" value="D" checked={this.state.answer === "D"} onChange={this.handleOptionChange} /> Question D:{" "}
                    {question.answerD ? question.answerD : ""}
                  </Label>
                </FormGroup>
              </div>
              <div>Tổng số người đang online: {peopleOnline ? peopleOnline : 0}  </div>
            </div>
          ) :
            ('')
        } */}
        </div>
      );
    }
    return <div>Play Game</div>;
  }
}

export default PlayGame;
