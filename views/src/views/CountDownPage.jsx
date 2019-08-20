import React, { Component } from "react";
import bg_countdown from "../assets/image/bg_countdown.png";
import cd_iq_lg from "../assets/image/cd_iq_lg.png";
import cd_r_lg from "../assets/image/cd_r_lg.png";
import logo_acb from "../assets/image/logo_acb.png";
import logo_bottom from "../assets/image/logo_bottom.png";
import polygon_more from "../assets/image/polygon_more.png";
import polygon_less from "../assets/image/polygon_less.png";
import back_button from "../assets/image/back_button.png";
import medal_cd from "../assets/image/medal.png";
import InfoDetail from "../components/CardElements/Countdown/InfoDetail";
import { Button } from "reactstrap";
import { socketGlobal } from "../utils/instanceSocket";
import { formatTime } from "../utils/formatTimer";
import { Link } from "react-router-dom";
import Game from "./../models/Game";
import { formatStringToDate } from "../utils/formatDate";
import { formatStringToTimeInfo } from "../utils/formatGameInfo";
import { formatMoney } from "../utils/formatMoney";
import AlertWarning from "components/SweetAlert/AlertWarning";
import music_off from "../assets/image/music_off.png";
import music_on from "../assets/image/music_on.png";
import bg_music from "../assets/image/bg_music.png";
class CountDownPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      more: false,
      second: 0,
      joinedGame: false,
      startGame: false,
      finishGame: false,
      checkStatusGame: "",
      openningGame: false,
      gameInfoLaw: "",
      getGameInfoPending: "",
      playerJoinedGame: "",
      frameMusicTog: this.props.bg_music_on_off
    };
    socketGlobal.on("countDownForStartGame", second => {
      if (second >= 0) {
        this.setState({
          second
        });
      }
    });
    socketGlobal.on("getListPlayerJustJoined", result => {
      if (result.success) {
        this.setState({
          playerJoinedGame: result.playerJoinedGame
        });
      }
    });
    socketGlobal.on("kickForLogin2Account", result => {
      if (result.success) {
        this.handleMutipleLogin();
        localStorage.removeItem("access_token");
      }
    });
    socketGlobal.on("responseUserInfo", res => {
      if (res.success) {
        this.setState({
          joinedGame: res.data.status === "PLAYING" ? true : false
        });
      }
    });
    socketGlobal.on("responseGameInfo", res => {
      if (res.data.status === "PENDING") {
        this.getGameInfoPending();
        this.setState({
          checkStatusGame: "PENDING",
          joinedGame: false
        });
      } else {
        if (res.data.status === "OPENING") {
          this.setState({
            finishGame: false,
            startGame: false,
            LostGame: false
          });
        }
        this.setState({
          checkStatusGame: res.data.status,
          getGameInfoPending: res.data
        });
      }
    });

    socketGlobal.on("finishGame", result => {
      this.setState({
        finishGame: true,
        startGame: false,
        joinedGame: false
      });
    });
    socketGlobal.on("startGame", result => {
      this.setState({
        startGame: result.success
      });
    });
    socketGlobal.on("confirmCheckToken", result => {
      if (!result.success) {
        this.handleOnBack();
        localStorage.removeItem("access_token");
      }
    });
    socketGlobal.on("confirmJoinedGame", result => {
      if (result.success) {
        this.setState({
          joinedGame: result.success
        });
      } else {
        this.handlePopUpCheckStatusGame();
        this.setState({
          openningGame: true
        });
      }
    });
    socketGlobal.on("startGame", result => {
      let joinedGame = this.state.joinedGame;
      if (result.success && joinedGame) {
        // this.handleOnEnded();
        this.props.handleOnEndedFixed();
      }
    });
  }
  handleOnBack = () => {
    this.props.handleOnBack();
  };
  _handleOnOffAlert = () => {
    this.setState({
      alert: ""
    });
  };
  get handleOnOffAlert() {
    return this._handleOnOffAlert;
  }
  set handleOnOffAlert(value) {
    this._handleOnOffAlert = value;
  }
  handleOnEnded = () => {
    this.props.handleOnEnded();
  };
  handleMutipleLogin = () => {
    this.props.handleViewDemo(7);
  };

  componentDidMount() {
    this.props.handleMusicBG(false);
    this.setState({
      frameMusicTog: false
    });
    this.getListInfo();
    socketGlobal.emit("process", {
      token: localStorage.getItem("access_token"),
      event: "checkToken"
    });
    socketGlobal.emit("process", {
      token: localStorage.getItem("access_token"),
      event: "getUserInfo"
    });
    socketGlobal.emit("process", {
      token: localStorage.getItem("access_token"),
      event: "getGameInfo"
    });
    socketGlobal.emit("process", {
      token: localStorage.getItem("access_token"),
      event: "getListPlayerJoinedGame"
    });
  }

  handleJoinGame = () => {
    socketGlobal.emit("process", {
      token: localStorage.getItem("access_token"),
      event: "joinGame"
    });
  };
  handleOnView = () => {
    this.setState(prevState => ({
      more: !prevState.more
    }));
  };
  handleViewDemo = () => {
    socketGlobal.emit("process", {
      event: "joinToWatchingRoom",
      token: localStorage.getItem("access_token")
    });
    this.props.handleViewDemo(5);
  };
  getGameInfoPending() {
    Game.getGameInfoPending().then(res => {
      if (res.length !== 0) {
        this.setState({
          getGameInfoPending: res[0]
        });
      } else {
        this.setState({
          getGameInfoPending: {
            bonus: 0,
            name: "Chưa Có Game",
            recommend: "",
            start_date: "1999-12-31T17:00:00.521Z"
          }
        });
      }
    });
  }
  handlePopUpCheck = () => {
    this.setState({
      alert: (
        <div className="popuper">
          <div className="popup-container">
            <div className="popup-content">
              Bạn có muốn tham gia chơi thử không?
            </div>
            <div className="popup_bottom justify-content-center">
              <Button onClick={this.handleViewDemo}>Tiếp tục</Button>
              <Button onClick={this._handleOnOffAlert}>Quay Lại</Button>
            </div>
          </div>
        </div>
      )
    });
  };
  _handleOnLogout = () => {
    localStorage.removeItem("access_token");
    // this.props.handleOnBack();
    window.location.replace("/");
    socketGlobal.emit("logOut");
  };
  _handlePopUpLogout = () => {
    this.setState({
      alert: (
        <AlertWarning
          message="Bạn có muốn đăng xuất không!"
          confirmToFunc={() => {
            this._handleOnLogout();
          }}
          cancleToFunc={() => {
            this._handleOnOffAlert();
          }}
        />
      )
    });
  };
  handlePopUpCheckStatusGame = () => {
    this.setState({
      alertOpenning: (
        <div className="popuper">
          <div className="popup-container">
            <div className="popup-content">GAME CHƯA MỞ</div>
            <div className="popup_bottom justify-content-center">
              <Button
                onClick={() => {
                  this.handleHiddenaAlertStatusGame();
                }}
              >
                QUAY LẠI
              </Button>
            </div>
          </div>
        </div>
      )
    });
  };
  handleHiddenaAlertStatusGame = () => {
    this.setState({
      alertOpenning: ""
    });
  };
  handleFalse = e => {
    e.preventDefault();
  };
  getListInfo = () => {
    Game.getGameInfo().then(res => {
      if (res) {
        this.setState({
          gameInfoLaw: res
        });
      }
    });
  };
  _handlePopUpBackGame = () => {
    this.handleOnBack();
  };
  handleBGMusic = () => {
    this.setState({ frameMusicTog: !this.state.frameMusicTog }, () => {
      this.props.handleMusicBG(this.state.frameMusicTog);
    });
  };
  render() {
    const {
      more,
      joinedGame,
      startGame,
      checkStatusGame,
      finishGame,
      gameInfoLaw,
      getGameInfoPending,
      second,
      playerJoinedGame,
      frameMusicTog
    } = this.state;
    const { LostGame } = this.props;
    return (
      <div
        className="view_countdown"
        style={{ backgroundImage: `url(${bg_countdown})` }}
      >
        {this.state.alert}
        {this.state.alertOpenning}
        <div className="back_button">
          <img
            src={back_button}
            className="back_button_"
            onClick={this._handlePopUpLogout}
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
        <div className="medal_cd_" id="medal_cdxx">
          <Link to="/listwinner">
            <img src={medal_cd} className="medal_cd" alt="" />
          </Link>
        </div>
        <div className="form_count_form">
          <div className="form_countdown">
            <div className="img_form">
              <img src={cd_iq_lg} className="img_form" alt="" />
            </div>
            <div className="box_count_down">
              <div className="b_l_countdown">
                <div className="hex_b_countdown">
                  <h1>
                    {getGameInfoPending.name ? getGameInfoPending.name : ""}
                  </h1>
                  <div className="b_l_date">
                    NGÀY:{" "}
                    {getGameInfoPending.start_date
                      ? formatStringToDate(getGameInfoPending.start_date)
                      : ""}
                  </div>
                  <div className="dotted-gradient" />
                  <h2>
                    {checkStatusGame === "PENDING"
                      ? "Game tiếp theo sẽ bắt đầu trong"
                      : "Sẽ bắt đầu trong"}
                  </h2>
                  <span
                    className={
                      second <= 5 && second > 0
                        ? "count_down_time flicker"
                        : "count_down_time"
                    }
                  >
                    {checkStatusGame === "PENDING"
                      ? formatStringToTimeInfo(getGameInfoPending.start_date)
                      : formatTime(second, checkStatusGame)}
                  </span>
                </div>
              </div>
              <div className="b_r_countdown">
                <div className="hex_br_countdown">
                  <div className="cd_r_lg_jx">
                    <img src={cd_r_lg} className="cd_r_lg" alt="" />
                  </div>
                  <h2>
                    Tổng giải thưởng hôm nay{" "}
                    {getGameInfoPending.bonus
                      ? formatMoney(getGameInfoPending.bonus)
                      : 0}{" "}
                    VNĐ
                  </h2>
                  <div className="dotted-gradient" />
                  <h2>GỢI Ý HÔM NAY:</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: getGameInfoPending.recommend
                        ? getGameInfoPending.recommend
                        : ""
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="live_per_wc">
              <div className="livePer">
                <p>
                  Số người đã tham gia:{" "}
                  {playerJoinedGame.quantity ? playerJoinedGame.quantity : 0}
                </p>
                {playerJoinedGame &&
                  playerJoinedGame.listPlayerJustJoined.map((props, index) => {
                    return <span key={index}>{props.user_id}</span>;
                  })}
              </div>
              {finishGame && !joinedGame && !startGame ? (
                <Button className="button_submit_login">
                  Game Đã Kết Thúc
                </Button>
              ) : (
                ""
              )}
              {!finishGame && !joinedGame && startGame ? (
                <Button
                  className={
                    joinedGame
                      ? "button_submit_login"
                      : "button_submit_login shakeActive"
                  }
                  onClick={this.handlePopUpCheck}
                >
                  Bấm để tham gia
                </Button>
              ) : (
                ""
              )}
              {!finishGame && !joinedGame && !startGame && LostGame ? (
                <Button
                  className={
                    joinedGame
                      ? "button_submit_login"
                      : "button_submit_login shakeActive"
                  }
                  onClick={this.handleJoinGame}
                >
                  Bấm để tham gia
                </Button>
              ) : (
                ""
              )}
              {!joinedGame && !startGame && !LostGame && !finishGame ? (
                <Button
                  className={
                    joinedGame
                      ? "button_submit_login"
                      : "button_submit_login shakeActive"
                  }
                  onClick={
                    !joinedGame && !startGame && checkStatusGame === "PLAYING"
                      ? this.handlePopUpCheck
                      : this.handleJoinGame
                  }
                >
                  {!joinedGame && !startGame && checkStatusGame === "PLAYING"
                    ? "Bấm để tham gia"
                    : "Bấm để tham gia"}
                </Button>
              ) : (
                ""
              )}
              {joinedGame && !startGame && !LostGame && !finishGame ? (
                <Button
                  className="button_submit_login"
                  onClick={
                    joinedGame && checkStatusGame === "PLAYING"
                      ? this.handlePopUpCheck
                      : this.handleFalse
                  }
                >
                  {" "}
                  {!joinedGame && checkStatusGame === "PLAYING"
                    ? ""
                    : "Đã tham gia"}
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="show_more_info">
          <p className="p_h1">luật chơi và thông tin giải thưởng</p>
          <div className={"infoDetail_wp "} hidden={!more}>
            <InfoDetail message={gameInfoLaw ? gameInfoLaw : ""} />
          </div>

          {more ? (
            <div className="show_less_polygon">
              <img
                src={polygon_less}
                onClick={this.handleOnView}
                className="polygon_less"
                alt=""
              />
              <p>Thu gọn</p>
            </div>
          ) : (
            <div className="show_more_polygon">
              <img
                src={polygon_more}
                onClick={this.handleOnView}
                className="polygon_more"
                alt=""
              />
            </div>
          )}
        </div>

        <div className="logo_bottom_">
          <img src={logo_bottom} className="logo_bottom" alt="" />
        </div>
      </div>
    );
  }
}

export default CountDownPage;
