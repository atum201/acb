import React, { Component } from "react";
import bg_countdown from "../assets/image/bg_countdown.png";
import icon_pre from "../assets/image/icon_pre.png";
import icon_next from "../assets/image/icon_next.png";
import Game from "./../models/Game";
import PropTypes from "prop-types";
import getUrlParam from "./../utils/getUrlParam";
import Pagination from "./../components/Pagination";
import Swiper from "swiper";
import logo_acb from "../assets/image/logo_acb.png";
import logo_bottom from "../assets/image/logo_bottom.png";
// import URL from "./../constants/url";
import { formatMoney } from "../utils/formatMoney";
import back_button from "../assets/image/back_button.png";
import { Link } from "react-router-dom";
class ListWinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game_id: this.props.match.params.id,
      frame: this.props.match.params.id ? this.props.match.params.id : false,
      page: !getUrlParam()["page"] ? "1" : getUrlParam()["page"],
      total: 1,
      isGameIDAvailable:
        window.location.pathname.split("/listwinner/")[1] !== "" &&
        window.location.pathname.split("/listwinner")[1] !== ""
          ? true
          : false
    };
  }

  componentDidMount() {
    this.getListGameDetail(this.state.game_id, this.state.page);
    this.getListGame();
  }

  swiper = () => {
    new Swiper(".swiper-container", {
      slidesPerView: 4,
      speed: 300,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 3
        }
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  };
  getListGameDetail(id, page) {
    Game.getGameResultDetail({ id, page }).then(res => {
      if (res) {
        this.setState({
          getListGameID: res,
          total: res.totalPages
        });
      }
    });
  }
  getListGame() {
    const { page } = this.state;
    Game.getGameResultFinish()
      .then(res => {
        this.setState({
          getGameID: res
        });
        return res.length !== 0 ? res[0].game_id : "123";
      })
      .then(res => {
        if (!this.state.frame) {
          this.setState({
            frame: res
          });
        }
        Game.getGameResultDetail({ id: res, page }).then(res => {
          if (res) {
            this.setState({
              getListGame: res,
              totalNewGame: res.totalPages,
              nameGame:
                res.docs[0] && !this.state.isGameIDAvailable
                  ? res.docs[0].game.name
                  : ""
            });
          }
        });
        this.swiper();
      });
  }
  _handleClickGame(params) {
    this.setState({
      frame: params
    });
    this.getListGameDetail(params, this.state.page);
  }

  render() {
    const {
      getListGame,
      isGameIDAvailable,
      getGameID,
      getListGameID,
      totalNewGame,
      total,
      nameGame,
      frame
    } = this.state;
    return (
      <div
        className="view_list_winner"
        style={{ backgroundImage: `url(${bg_countdown})` }}
      >
        <div className="back_button">
          <Link to="/">
            <img
              src={back_button}
              className="back_button_"
              onClick={this._handlePopUpQuitGame}
              alt=""
            />
          </Link>
        </div>
        <div className="logo_page_liswinner">
          <Link to="/">
            <img src={logo_acb} className="img_acb" alt="" />
          </Link>
        </div>
        <div className="list_infowinner">
          <h3>DANH SÁCH NHỮNG BẠN CHIẾN THẮNG {nameGame}</h3>
          <div className="nav_game">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {getGameID &&
                  getGameID.map((props, index) => {
                    return (
                      <div className="swiper-slide" key={index}>
                        <Link
                          to={"/listwinner/" + props.game_id}
                          onClick={() => this._handleClickGame(props.game_id)}
                          className={
                            frame === props.game_id
                              ? "txt_ctv active"
                              : "txt_ctv"
                          }
                        >
                          {props.name}
                        </Link>
                      </div>
                    );
                  })}
              </div>

              <div
                className="swiper-button-prev"
                style={{
                  backgroundImage: `url(${icon_pre})`,
                  backgroundSize: "contain",
                  width: "30px",
                  height: "30px"
                }}
              />
              <div
                className="swiper-button-next"
                style={{
                  backgroundImage: `url(${icon_next})`,
                  backgroundSize: "contain",
                  width: "30px",
                  height: "30px"
                }}
              />
              <div className="swiper-pagination" />
            </div>
            {/* <ul>
              {getListGameALL &&
                getListGameALL.map((props, index) => {
                  return (
                    <li key={index}>
                      <a href={props.game_id}>{props.name}</a>
                    </li>
                  );
                })}
            </ul> */}
          </div>
          {isGameIDAvailable
            ? getListGameID &&
              getListGameID.docs.map((props, key) => {
                return (
                  <div className="list" key={key}>
                    <span className="u_name">
                      {props.user ? props.user.lastname : "anonymous"}
                    </span>
                    <span className="u_point">
                      {formatMoney(parseInt(props.prize, 10)) + "₫"}
                    </span>
                  </div>
                );
              })
            : getListGame &&
              getListGame.docs.map((props, index) => {
                return (
                  <div className="list" key={index}>
                    <span className="u_name">
                      {props.user ? props.user.lastname : "anonymous"}
                    </span>
                    <span className="u_point">
                      {formatMoney(parseInt(props.prize, 10)) + "₫"}
                    </span>
                  </div>
                );
              })}
          <div className="pagination-container mt-3">
            <Pagination
              total={isGameIDAvailable ? total : totalNewGame}
              sort={this.state.game_id ? this.state.game_id : ""}
              current={this.state.page}
            />
          </div>
        </div>
        <div className="logo_bottom_">
          <img src={logo_bottom} className="logo_bottom" alt="" />
        </div>
      </div>
    );
  }
}

export default ListWinner;
ListWinner.propTypes = {
  getListGame: PropTypes.object
};
ListWinner.defaultProps = {
  getListGame: {
    docs: []
  }
};
