import React, { Component } from "react";
import q_timer from "../../assets/image/q_timer.png";
import girl_mess from "../../assets/image/girl_mess.png";
import logo_bottom from "../../assets/image/logo_bottom.png";
import bg_countdown from "../../assets/image/bg_countdown.png";
import logo_acb from "../../assets/image/logo_acb.png";
import Milestone from "../../components/CardElements/GamePage/Milestone";
import MilestoneCount from "./../../components/CardElements/GamePage/MilestoneCount";
import MilestoneCountMobile from "./../../components/CardElements/GamePage/MilestoneCountMobile";
import { socketGlobal } from "../../utils/instanceSocket";
import Button from "reactstrap/lib/Button";
import TRUE_SOUND from "../../assets/sound/true.mp3";
import FALSE_SOUND from "../../assets/sound/false.mp3";
import pendding1 from "../../assets/image/pendding1.png";
import cup_pendding from "../../assets/image/cup_pendding.png";
import { withRouter } from "react-router-dom";
import CustomText from "../../components/CustomText/CustomText";
import CountUp from "react-countup";
import MessageFail from "../../components/CardElements/GamePage/MessageFail";
import MessageSuccess from "../../components/CardElements/GamePage/MessageSuccess";
import back_button from "../../assets/image/back_button.png";
import AlertWarning from "components/SweetAlert/AlertWarning";
import bg_music from "../../assets/image/bg_music.png";
import music_off from "../../assets/image/music_off.png";
import music_on from "../../assets/image/music_on.png";
const { detect } = require("detect-browser");
const browser = detect();
class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: null,
      DA: "",
      question: {},
      secondWaitTheQuestion: 0,
      secondWaitTheAnswer: 0,
      waitTheQuestion: false,
      waitTheAnswer: false,
      finishGame: false,
      peopleOnline: 0,
      answer: "",
      lose: false,
      rightQuantity: 0,
      wrongQuantity: 0,
      bestPerson: false,
      waitTheLastQuestionPart1: false,
      waitTheLastQuestionPart2: false,
      waitTheLastQuestionPart3: false,
      secondWaitTheLastQuestionPart3: 0,
      currentPlayer: 0,
      isAnswer: null,
      totalSelect: 0,
      peopleSelectA: 0,
      peopleSelectB: 0,
      peopleSelectC: 0,
      peopleSelectD: 0,
      allPlayer: 0,
      frameMusicTog: this.props.bg_music_on_off
    };
    socketGlobal.on("responseGameInfo", res => {
      if (res.data.status !== "PLAYING") {
        this.props.handleOnRedirect();
      }
    });
    socketGlobal.on("confirmCheckToken", result => {
      if (!result.success) {
        this.handleOnBack();
        localStorage.removeItem("access_token");
      }
    });
    socketGlobal.on("responseCountAllPlayer", result => {
      if (result.success) {
        this.setState({
          allPlayer: result.count,
          rightQuantity: result.count
        });
      }
    });

    socketGlobal.on("quantityRightWrongAnswer", result => {
      if (result.success) {
        const {
          rightQuantity,
          wrongQuantity,
          totalSelect,
          peopleSelectA,
          peopleSelectB,
          peopleSelectC,
          peopleSelectD
        } = result.quantity;
        this.setState({
          rightQuantity,
          wrongQuantity,
          totalSelect,
          peopleSelectA,
          peopleSelectB,
          peopleSelectC,
          peopleSelectD
        });
      }
    });
    socketGlobal.on("responseGameInfo", res => {
      if (res.data.game_id) {
        localStorage.setItem("game_id", res.data.game_id);
        this.setState({
          game_id: res.data.game_id
        });
      }
    });
    socketGlobal.emit("process", {
      event: "getCurrentQuestion",
      token: localStorage.getItem("access_token")
    });
    socketGlobal.on("confirmCheckToken", result => {
      if (!result.success) {
        this.handleOnBack();
        localStorage.removeItem("access_token");
      }
    });

    socketGlobal.on("countCurrentPlayer", result => {
      if (result.success)
        this.setState({
          currentPlayer: result.count
        });
    });

    socketGlobal.on("waitTheLastQuestionPart1", second => {
      this.handlePopUpPeddingWinner();
      this.setState({
        waitTheLastQuestionPart1: true,
        waitTheLastQuestionPart2: false,
        waitTheLastQuestionPart3: false,
        waitTheQuestion: false,
        waitTheAnswer: false
      });
    });

    socketGlobal.on("waitTheLastQuestionPart2", second => {
      this.handlePopUpPeddingWinner();
      this.setState({
        waitTheLastQuestionPart1: false,
        waitTheLastQuestionPart2: true,
        waitTheLastQuestionPart3: false,
        waitTheQuestion: false,
        waitTheAnswer: false
      });
    });

    socketGlobal.on("waitTheLastQuestionPart3", second => {
      this.handlePopUpPeddingWinner();
      this.removeClassEffect("answer-key");
      this.removeClassEffect("answer");
      this.setState({
        waitTheLastQuestionPart1: false,
        waitTheLastQuestionPart2: false,
        waitTheLastQuestionPart3: true,
        waitTheQuestion: false,
        waitTheAnswer: false,
        secondWaitTheLastQuestionPart3: second
      });
      if (second < 1) {
        this.handleHiddenAlertWinnerCheck();
        this.setState({
          answer: ""
        });
      }
    });

    socketGlobal.on("waitTheNextQuestion", second => {
      this.removeClassEffect("answer-key");
      this.removeClassEffect("answer");
      this.setState({
        secondWaitTheQuestion: second,
        waitTheQuestion: true,
        waitTheAnswer: false,
        answer: "",
        isAnswer: null,
        peopleSelectA: 0,
        peopleSelectB: 0,
        peopleSelectC: 0,
        peopleSelectD: 0
      });
    });

    socketGlobal.on("waitTheAnswer", second => {
      this.setState({
        secondWaitTheAnswer: second,
        waitTheAnswer: true,
        waitTheQuestion: false,
        isAnswer: null
      });
    });

    socketGlobal.on("responseQuestion", question => {
      if (question.success) {
        this.setState({
          question: question.data,
          rightQuantity: 0,
          wrongQuantity: 0,
          level: question.data.ordinalNumber - 1
        });
      } else console.log(question.message);
    });

    socketGlobal.on("peopleOnline", quantity => {
      this.setState({
        peopleOnline: quantity
      });
    });
    socketGlobal.on("responseResult", result => {
      if (!result.success) return;

      const { ordinalNumber, rightAnswer } = result.data;
      if (ordinalNumber === this.state.question.ordinalNumber) {
        if (rightAnswer === this.state.answer) {
          this.setState({ isAnswer: true });
          this.checkAnswer(rightAnswer);
          if (browser) {
            if (browser.name === "chrome") {
              let audio = new Audio(TRUE_SOUND);
              audio.play();
            }
          }

          if (this.state.level === 2) {
            this.setState(state => ({
              level: state
            }));
          }
        } else {
          this.checkAnswerFalse(this.state.answer, rightAnswer);
          this.setState({ isAnswer: false });
          if (browser) {
            if (browser.name === "chrome") {
              let audio = new Audio(FALSE_SOUND);
              audio.play();
            }
          }
          this.setState({
            lose: true,
            waitTheAnswer: false,
            waitTheQuestion: false
          });
        }
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
      this.handlePopUpFinishGame();
      this.props.handleMusicBG(false);
      this.setState({
        waitTheQuestion: false,
        waitTheAnswer: false,
        finishGame: true,
        isLoading: false
      });
    });
  }
  handleOnAnswer = params => {
    this.setState({
      answer: params
    });
  };
  handleOnBack = () => {
    this.props.handleOnBack();
  };
  handleViewWinner = () => {
    this.props.handleViewDemo(6);
  };
  handleViewDemo = () => {
    socketGlobal.emit("process", {
      event: "joinToWatchingRoom",
      token: localStorage.getItem("access_token")
    });
    this.props.handleViewDemo(5);
  };
  handlePopUpWrongAnswer = () => {
    this.setState({
      alert: (
        <div className="popuper">
          <div className="popup-container">
            <div className="popup-content">
              Bạn có muốn tiếp tục tham gia với tư cách khán giả không?
            </div>
            <div className="popup_bottom justify-content-center">
              <Button onClick={this.handleViewDemo}>Tiếp tục</Button>
              <Button
                onClick={() => {
                  this.handleOnBack();
                }}
              >
                Rời đi
              </Button>
            </div>
          </div>
        </div>
      )
    });
  };
  handlePopUpFinishGame = () => {
    this.setState({
      alert: (
        <div className="popuper">
          <div className="popup-container">
            <div className="popup-content">Game đã kết thúc?</div>
            <div className="popup_bottom justify-content-center">
              <Button
                onClick={() => {
                  this.handleOnBack();
                }}
              >
                Rời đi
              </Button>
              <Button onClick={this.handleRedirectGameID}>
                Danh Sách Chiến Thắng
              </Button>
            </div>
          </div>
        </div>
      )
    });
  };
  renderAnswerClass = (answer, isSuccess) => {
    if (this.state.answer !== answer) {
      return "answer";
    } else {
      return isSuccess ? "answer active" : "answer activeFail";
    }
  };
  handleHiddenAlertWinnerCheck = () => {
    setTimeout(() => {
      this.setState({
        alertWinner: ""
      });
    }, 2000);
  };
  handleHiddenAlertWinner = () => {
    this.setState({
      alertWinner: ""
    });
  };
  handleRedirectGameID = () => {
    const { game_id } = this.state;
    if (game_id) {
      this.props.history.push("/listwinner/" + game_id);
    } else {
      window.location.replace("/listwinner/");
    }
  };
  handlePopUpPeddingWinner = () => {
    const {
      waitTheLastQuestionPart1,
      waitTheLastQuestionPart2,
      waitTheLastQuestionPart3,
      secondWaitTheLastQuestionPart3
    } = this.state;
    this.setState({
      alertWinner: (
        <div
          className="popuperwinner"
          style={{ backgroundImage: `url(${bg_countdown})` }}
        >
          <div className="logo_page_c">
            <img src={logo_acb} className="img_acb" alt="" />
          </div>
          <div className="popup_container">
            <img src={pendding1} alt="" className="pendding1" />
            {waitTheLastQuestionPart1 ? (
              <div className="dv_ig">
                <p>
                  Bạn đã SẴN SÀNG để trở thành một trong những người chiến thắng
                  Game hôm nay chưa?
                </p>
              </div>
            ) : (
              ""
            )}
            {waitTheLastQuestionPart2 ? (
              <div className="dv_ig2">
                <img src={cup_pendding} alt="" className="pendding1" />
                <p className="mt-2">Câu hỏi chiến thắng sẽ bắt đầu trong</p>
              </div>
            ) : (
              ""
            )}
            {waitTheLastQuestionPart3 ? (
              <div className="dv_ig3">
                <div className="count_down">
                  <span className="timer_pendding">
                    {secondWaitTheLastQuestionPart3}
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )
    });
  };

  componentDidMount() {
    if (!this.state.frameMusicTog) {
      this.props.handleMusicBG(true);
      this.setState({
        frameMusicTog: !this.state.frameMusicTog
      });
    }
    socketGlobal.emit("process", {
      token: localStorage.getItem("access_token"),
      event: "getGameInfo"
    });
    socketGlobal.emit("process", {
      token: localStorage.getItem("access_token"),
      event: "checkToken"
    });
    socketGlobal.emit("process", {
      token: localStorage.getItem("access_token"),
      event: "getCountAllPlayer"
    });
    socketGlobal.emit("process", {
      token: localStorage.getItem("access_token"),
      event: "getCountCurrentPlayer"
    });
    if (this.state.finishGame) {
      this.setState({ isLoading: false });
    } else {
      setTimeout(() => {
        this.setState({ isLoading: true });
      }, 500);
    }
  }
  checkAnswer = anwersCheck => {
    var spans = document.getElementsByClassName("answer");
    for (var i = 0; i < spans.length; i++) {
      var span = spans[i];
      if (span.childNodes[0].innerHTML === anwersCheck) {
        span.classList.add("answertrue");
      }
    }
  };
  checkAnswerFalse = (anwersCheck, DA) => {
    var spans = document.getElementsByClassName("answer");
    for (var i = 0; i < spans.length; i++) {
      var span = spans[i];
      if (span.childNodes[0].innerHTML === anwersCheck) {
        span.classList.add("answerfalse");
      }
      if (span.childNodes[0].innerHTML === DA) {
        span.classList.add("answertrueCheck");
      }
    }
  };
  removeClassEffect = classNameX => {
    var spans = document.getElementsByClassName(classNameX);
    for (var i = 0; i < spans.length; i++) {
      var span = spans[i];
      span.classList.remove("answertrue");
      span.classList.remove("answerfalse");
      span.classList.remove("answertrueCheck");
      span.classList.remove("active");
    }
  };

  renderPercent = (peopleSelectAnswer, totalPeopleSelect) => {
    let a = Math.floor(peopleSelectAnswer);
    let b = Math.floor(totalPeopleSelect);
    if (a === 0 || b === 0) {
      return 0;
    }

    return (a / b) * 100;
  };
  _handleOnOffAlert = () => {
    this.setState({
      alert: ""
    });
  };
  _handlePopUpQuitGame = () => {
    this.setState({
      alert: (
        <AlertWarning
          message="Bạn chắc chắn muốn thoát game!"
          confirmToFunc={() => {
            this.handleOnBack();
          }}
          cancleToFunc={() => {
            this._handleOnOffAlert();
          }}
        />
      )
    });
  };
  handleBGMusic = () => {
    this.setState({ frameMusicTog: !this.state.frameMusicTog }, () => {
      this.props.handleMusicBG(this.state.frameMusicTog);
    });
  };
  render() {
    const {
      answer,
      DA,
      question,
      waitTheQuestion,
      secondWaitTheQuestion,
      secondWaitTheAnswer,
      // rightQuantity,
      waitTheAnswer,
      isAnswer,
      explain,
      totalSelect,
      peopleSelectA,
      peopleSelectB,
      peopleSelectC,
      peopleSelectD,
      allPlayer,
      currentPlayer,
      frameMusicTog
    } = this.state;
    return (
      <div
        className="view-game"
        style={{ backgroundImage: `url(${bg_countdown})` }}
      >
        {this.state.alert}
        {this.state.alertWinner}
        <div className="back_button">
          <img
            src={back_button}
            className="back_button_"
            onClick={this._handlePopUpQuitGame}
            alt=""
          />
        </div>
        <div className="logo_page">
          <img src={logo_acb} className="img_acb" alt="" />
        </div>
        <div className="bx_music">
          <div className="bx_bg_music">
            <img src={bg_music} alt="" className="bg_music" />
          </div>
          <img
            src={frameMusicTog ? music_on : music_off}
            className="img_music"
            onClick={this.handleBGMusic}
            alt=""
          />
        </div>
        <div className="container">
          <div className="game-container">
            {waitTheQuestion && !waitTheAnswer && isAnswer == null ? (
              <div className="mess_info">
                <img src={q_timer} alt="" className="img_fixed" />

                <span className="message_timer">{"Câu tiếp theo: "}</span>
                <span className="_mstimer">{secondWaitTheQuestion}</span>
                <img src={girl_mess} alt="" className="girl_mess" />
              </div>
            ) : (
              ""
            )}
            {!waitTheQuestion && waitTheAnswer && isAnswer == null ? (
              <div className="mess_info">
                <img src={q_timer} alt="" className="img_fixed" />

                <span className="message_timer">{"Thời Gian: "}</span>
                <span className="_mstimer">{secondWaitTheAnswer}</span>
                <img src={girl_mess} alt="" className="girl_mess" />
              </div>
            ) : (
              ""
            )}

            {!waitTheQuestion &&
            waitTheAnswer &&
            isAnswer &&
            isAnswer !== null ? (
              <MessageSuccess message={explain ? explain : ""} />
            ) : (
              ""
            )}
            {!waitTheQuestion &&
            !waitTheAnswer &&
            isAnswer !== null &&
            !isAnswer ? (
              <MessageFail message={explain ? explain : ""} />
            ) : (
              ""
            )}
            <div className="question">
              <strong>
                Câu {question.ordinalNumber ? question.ordinalNumber : ""} :{" "}
              </strong>
              <span className="question-detail animate fadeIn">
                {waitTheQuestion && !waitTheAnswer ? (
                  <CustomText isLoading={this.state.isLoading} />
                ) : (
                  question.title
                )}
              </span>
            </div>
            {waitTheQuestion && !waitTheAnswer ? (
              <div className="answers" data-id="A">
                <div
                  className={this.renderAnswerClass(
                    "A",
                    DA !== "" ? answer === DA : true
                  )}
                  onClick={() => this.handleOnAnswer("A")}
                >
                  <div className="answer-key">A</div>
                  <div className="answer-detail">
                    <CustomText isLoading={this.state.isLoading} />
                  </div>
                </div>
                <div
                  className={this.renderAnswerClass(
                    "B",
                    DA !== "" ? answer === DA : true
                  )}
                  onClick={() => this.handleOnAnswer("B")}
                >
                  <div className="answer-key">B</div>
                  <div className="answer-detail">
                    <CustomText isLoading={this.state.isLoading} />
                  </div>
                </div>
                <div
                  className={this.renderAnswerClass(
                    "C",
                    DA !== "" ? answer === DA : true
                  )}
                  onClick={() => this.handleOnAnswer("C")}
                >
                  <div className="answer-key">C</div>
                  <div className="answer-detail">
                    <CustomText isLoading={this.state.isLoading} />
                  </div>
                </div>
                <div
                  className={this.renderAnswerClass(
                    "D",
                    DA !== "" ? answer === DA : true
                  )}
                  onClick={() => this.handleOnAnswer("D")}
                >
                  <div className="answer-key">D</div>
                  <div className="answer-detail">
                    <CustomText isLoading={this.state.isLoading} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="answers">
                <div
                  className={this.renderAnswerClass(
                    "A",
                    DA !== "" ? answer === DA : true
                  )}
                  onClick={() => this.handleOnAnswer("A")}
                >
                  <div className="answer-key">A</div>
                  <div className="answer-detail">
                    {question.answerA ? question.answerA : ""}
                  </div>
                  <div className="answer_percent">
                    <CountUp
                      end={
                        isNaN(this.renderPercent(peopleSelectA, totalSelect))
                          ? 0
                          : Math.floor(
                              this.renderPercent(peopleSelectA, totalSelect)
                            )
                      }
                      duration={5}
                      className="percentCountUp"
                    />
                    %
                  </div>
                </div>
                <div
                  className={this.renderAnswerClass(
                    "B",
                    DA !== "" ? answer === DA : true
                  )}
                  onClick={() => this.handleOnAnswer("B")}
                >
                  <div className="answer-key">B</div>
                  <div className="answer-detail">
                    {question.answerB ? question.answerB : ""}
                  </div>
                  <div className="answer_percent">
                    {
                      <CountUp
                        end={
                          isNaN(this.renderPercent(peopleSelectB, totalSelect))
                            ? 0
                            : Math.floor(
                                this.renderPercent(peopleSelectB, totalSelect)
                              )
                        }
                        duration={5}
                        className="percentCountUp"
                      />
                    }
                    %
                  </div>
                </div>
                <div
                  className={this.renderAnswerClass(
                    "C",
                    DA !== "" ? answer === DA : true
                  )}
                  onClick={() => this.handleOnAnswer("C")}
                >
                  <div className="answer-key">C</div>
                  <div className="answer-detail">
                    {question.answerC ? question.answerC : ""}
                  </div>
                  <div className="answer_percent">
                    {
                      <CountUp
                        end={
                          isNaN(this.renderPercent(peopleSelectC, totalSelect))
                            ? 0
                            : Math.floor(
                                this.renderPercent(peopleSelectC, totalSelect)
                              )
                        }
                        duration={5}
                        className="percentCountUp"
                      />
                    }
                    %
                  </div>
                </div>
                <div
                  className={this.renderAnswerClass(
                    "D",
                    DA !== "" ? answer === DA : true
                  )}
                  onClick={() => this.handleOnAnswer("D")}
                >
                  <div className="answer-key">D</div>
                  <div className="answer-detail">
                    {question.answerD ? question.answerD : ""}
                  </div>
                  <div className="answer_percent">
                    {
                      <CountUp
                        end={
                          isNaN(this.renderPercent(peopleSelectD, totalSelect))
                            ? 0
                            : Math.floor(
                                this.renderPercent(peopleSelectD, totalSelect)
                              )
                        }
                        duration={5}
                        className="percentCountUp"
                      />
                    }
                    %
                  </div>
                </div>
              </div>
            )}

            <Milestone level={this.state.level} />
            <div className="active_users">
              <div className="b_l_active_users">
                {/* Tổng số người đang online: {peopleOnline ? peopleOnline : 0} */}
              </div>
              <div className="b_r_active_users">
                {/* <p>
                Số người trả lời đúng: {rightQuantity ? rightQuantity : 0}
              </p> */}
                {/* <p>Số người trả lời sai: {wrongQuantity ? wrongQuantity : 0}</p> */}
                {/* <p>Số người đang chơi: {currentPlayer ? currentPlayer : 0} </p> */}
              </div>
            </div>
            <MilestoneCount
              rightQuantity={currentPlayer}
              allPlayer={allPlayer}
            />
          </div>
          <MilestoneCountMobile
            rightQuantity={currentPlayer}
            allPlayer={allPlayer}
          />
        </div>
        <div className="logo_bottom_">
          <img src={logo_bottom} className="logo_bottom" alt="" />
        </div>
      </div>
    );
  }
}

export default withRouter(GamePage);
