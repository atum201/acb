import React, { Component } from "react";
import bg_winner from "../assets/image/page_winner.jpg";
import bg_winner_sm from "../assets/image/bg_winner_sm.jpg";
import bn_win from "../assets/image/bn_win.png";
import cup_black from "../assets/image/cup_black.png";
import logo_acb from "../assets/image/logo_acb.png";
import Loader from "../components/Loader";
import { socketGlobal } from "../utils/instanceSocket";
import { formatMoney } from "../utils/formatMoney";
import { withRouter, Link } from "react-router-dom";
class WinnerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setBg: window.innerWidth > 672 ? bg_winner : bg_winner_sm,
      bonusPerPerson: 0,
      winner: 0
    };
    socketGlobal.on("youWin", result => {
      if (result.success) {
        this.setState({
          bonusPerPerson: result.data.bonusPerPerson,
          winner: result.data.winner
        });
      }
    });
  }
  handleRedirectGameID = () => {
    if (localStorage.getItem("game_id")) {
      let game_id = localStorage.getItem("game_id");
      this.props.history.push("/listwinner/" + game_id);
    } else {
      window.location.href = "/listwinner/";
    }
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 5000);
  }
  render() {
    const { setBg, bonusPerPerson, winner } = this.state;
    return (
      <div
        className="view_winner_loading"
        style={{ backgroundImage: `url(${setBg})` }}
      >
        <Loader isLoaded={this.state.isLoaded} />
        <div className="logo_page">
          <Link to="/">
            <img src={logo_acb} className="img_acb" alt="" />
          </Link>
        </div>
        <div className="dw_winner">
          <img src={cup_black} alt="" className="cup_black" />
          <p>CHÚC MỪNG CHIẾN THẮNG !</p>
          <div className="dv_ig">
            <img src={bn_win} alt="" className="bn_win" />
            <div className="dv_b_monney">
              SỐ TIỀN NHẬN ĐƯỢC:
              <br /> {formatMoney(parseInt(bonusPerPerson, 10)) + "₫"}
            </div>
          </div>
          <h4>Số người chiến thắng: {winner}</h4>
          <button onClick={this.handleRedirectGameID}>
            DANH SÁCH <br /> NGƯỜI CHIẾN THẮNG
          </button>
        </div>
        <div className="before" />
        <div className="after" />
      </div>
    );
  }
}

export default withRouter(WinnerPage);
