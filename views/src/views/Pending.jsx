import React, { Component } from "react";
import { socketGlobal } from "../utils/instanceSocket";
import PlayGame from "./PlayGame";

class Pending extends Component {
  secondCountDown = 0;
  constructor(props) {
    super(props);

    this.state = {
      second: 0,
      login: true,
      startGame: false,
      joinedGame: false,
      finishGame: false,
      kick: false,
      user_id: ""
    };


    socketGlobal.on("kickForLogin2Account", result => {
      if (result.success)
        this.setState({
          kick: result.success
        });
    });

    socketGlobal.on("countDownForStartGame", second => {
      this.setState({
        second
      });
    });

    socketGlobal.on("confirmJoinedGame", result => {
      if (result.success)
        this.setState({
          joinedGame: result.success
        });
      else console.log(result.message);
    });

    socketGlobal.on("startGame", text => {
      this.setState({
        startGame: true
      });
    });

    socketGlobal.on("finishGame", text => {
      this.setState({
        finishGame: true,
        startGame: false
      });
    });
  }

  handleSocketJoinGame = () => {
    socketGlobal.emit("process", {
      token: localStorage.getItem("access_token"),
      event: "joinGame"
    });
  };

  render() {
    let login = this.state.login;
    let startGame = this.state.startGame;
    let finishGame = this.state.finishGame;
    let joinedGame = this.state.joinedGame;
    let kick = this.state.kick;
    return (
      <div>
        {kick ? (
          <div>
            <div>Tài khoản của bạn đã đăng nhập ở 1 nơi khác</div>
          </div>
        ) : (
            ""
          )}
        {!kick && finishGame ? (
          <div>
            <div>Game đã kết thúc</div>
          </div>
        ) : (
            ""
          )}
        {!kick &&! finishGame && login && startGame && !joinedGame ? (
          <div>Game đang diễn ra. Bạn có muốn theo dõi game ko</div>
        ) : (
            ""
          )}
        {!kick && !finishGame && login && !startGame && !joinedGame ? (
          <div>
            <div>
              {" "}
              Bạn đã đăng nhập. Game sẽ bắt đầu sau {this.state.second}s Nhấn
              nút bên dưới để tham gia
            </div>
            <div>
              <input
                type="button"
                name="test"
                value="Tham gia"
                onClick={this.handleSocketJoinGame}
              />
            </div>
          </div>
        ) : (
            ""
          )}
        {!kick && !finishGame && login && !startGame && joinedGame ? (
          <div>Bạn đã tham gia. Game sẽ bắt đầu sau {this.state.second}s</div>
        ) : (
            ""
          )}
        {!kick && !finishGame && login && startGame && joinedGame ? (
          <div>
            <PlayGame />
          </div>
        ) : (
            ""
          )}
      </div>
    );
  }
}

export default Pending;
