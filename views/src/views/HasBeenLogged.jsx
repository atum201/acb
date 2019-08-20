import React, { Component } from "react";
import bg_winner from "../assets/image/page_winner.jpg";
import bg_winner_sm from "../assets/image/bg_winner_sm.jpg";
class WinnerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setBg: window.innerWidth > 672 ? bg_winner : bg_winner_sm,
      bonusPerPerson: 0,
      winner: 0
    };
  }
  render() {
    const { setBg } = this.state;
    return (
      <div
        className="view_winner_loading"
        style={{ backgroundImage: `url(${setBg})` }}
      >
        <div className="dw_winner">
          <p>Tài Khoản đã đăng nhập ở một nơi khác!</p>
        </div>
      </div>
    );
  }
}

export default WinnerPage;
