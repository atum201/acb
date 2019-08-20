import React, { Component } from "react";
import Pending from "../views/Pending";
import { socketGlobal } from "../utils/instanceSocket";

class Home extends Component {
  constructor(props) {
    super(props);
    // localStorage.setItem("access_token", "");
    this.state = {
      second: 0,
      // joinedGame: false,
      login: false,
      startGame: false,
      finishGame: false,
      user_id: ""
    };

    // axios({
    //   headers: { 'Content-Type': 'application/json' },
    //   method: 'get',
    //   url: 'http://localhost:5000/game/all',
    // }).then(data => this.listGame = data)
    //   .then(() => console.log(this.listGame));

    socketGlobal.on("countDownForStartGame", second => {
      this.setState({
        second
      });
    });

    socketGlobal.on("responseLogin", result => {
      if (result.success) {
        const token = result.token;
        localStorage.setItem("access_token", token);
        this.setState({
          login: result.success
        });
      } else console.log(result.message);
    });

    // socketGlobal.on("joinGame", text => {
    //   this.setState({
    //     joinedGame: true
    //   });
    // });

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

  handleSocketLogin = () => {
    socketGlobal.emit("login", {
      user_id: this.state.user_id
    });
  };

  handleOptionChange = changeEvent => {
    this.setState({
      user_id: changeEvent.target.value
    });
  };

  render() {
    let startGame = this.state.startGame;
    let finishGame = this.state.finishGame;
    let login = this.state.login;
    return (
      <div>
        {finishGame ? (
          <div>
            <div>Game đã kết thúc</div>
          </div>
        ) : (
          ""
        )}
        {!finishGame && !login && !startGame ? (
          <div>
            <div>
              User id: <input type="text" onChange={this.handleOptionChange}/>{" "}
              <br />
              <input
                type="button"
                name="test"
                value="Đăng nhập"
                onClick={this.handleSocketLogin}
              />
            </div>
            <div>Game sẽ bắt đầu sau: {this.state.second}s</div>
          </div>
        ) : (
          ""
        )}
        {!finishGame && !login && startGame ? (
          <div>Game đang diễn ra. Bạn có muốn theo dõi game ko</div>
        ) : (
          ""
        )}
        {!finishGame && login ? (
          <div>
            <Pending socket={socketGlobal} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Home;
