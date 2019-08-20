import React, { Component } from "react";
import LoginPage from "../views/LoginPage";
import CountDownPage from "../views/CountDownPage";
import WinnerPage from "../views/WinnerPage";
import GamePage from "../views/GamePage";
import HasBeenLogged from "../views/HasBeenLogged";
import DemoGame from "../views/pageDemo/demoGame";
import Authentication from "../models/Authentication";
import BG_SOUND from "../assets/sound/musicbg.mp3";
const { detect } = require("detect-browser");
const browser = detect();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: null,
      is_gift: null,
      level: "",
      lost: false,
      bg_music_on_off: false
    };
  }
  audio = new Audio(BG_SOUND);
  _handleMusicBG = params => {
    this.setState({ bg_music_on_off: params }, () => {
      if (browser) {
        if (browser.name === "chrome") {
          this.state.bg_music_on_off ? this.audio.play() : this.audio.pause();
        }
      }
    });
  };
  componentDidMount() {
    var stage = Authentication.checkLogin() ? 1 : 0;
    this.setState({
      stage
    });
  }
  handleOnEnded = () => {
    this.setState(prevState => ({
      stage: prevState.stage + 1
    }));
  };
  handleOnRedirect = () => {
    this.setState({
      stage: 1
    });
  };
  handleOnEndedFixed = () => {
    this.setState({
      stage: 2
    });
  };

  handleOnBack = () => {
    switch (this.state.stage) {
      case 1:
        this.setState({ stage: 0 });
        break;
      case 2:
        this.setState({ stage: 1 });
        break;
      case 3:
        this.setState({ stage: 1 });
        break;
      case 5:
        this.setState({ stage: 1 });
        break;
      default:
        this.setState({ stage: null });
        break;
    }
  };
  handleUserLost = prams => {
    this.setState({
      lost: prams
    });
  };
  handleViewDemo = prams => {
    this.setState({
      stage: prams
    });
  };
  renderView() {
    const stage = this.state.stage;
    switch (stage) {
      case 0:
        return (
          <LoginPage
            handleOnEnded={this.handleOnRedirect}
            handleMusicBG={this._handleMusicBG}
            bg_music_on_off={this.state.bg_music_on_off}
          />
        );
      case 1:
        return (
          <CountDownPage
            handleOnEnded={this.handleOnEnded}
            handleOnEndedFixed={this.handleOnEndedFixed}
            handleOnBack={this.handleOnBack}
            LostGame={this.state.lost}
            handleMusicBG={this._handleMusicBG}
            bg_music_on_off={this.state.bg_music_on_off}
            handleViewDemo={this.handleViewDemo}
          />
        );
      case 2:
        return (
          <GamePage
            handleOnBack={this.handleOnBack}
            handleUserLost={this.handleUserLost}
            handleMusicBG={this._handleMusicBG}
            handleOnRedirect={this.handleOnRedirect}
            bg_music_on_off={this.state.bg_music_on_off}
            handleViewDemo={this.handleViewDemo}
          />
        );
      case 5:
        return (
          <DemoGame
            handleOnBack={this.handleOnBack}
            handleOnRedirect={this.handleOnRedirect}
            handleMusicBG={this._handleMusicBG}
            bg_music_on_off={this.state.bg_music_on_off}
          />
        );
      case 6:
        return (
          <WinnerPage
            handleOnBack={this.handleOnBack}
            handleViewDemo={this.handleViewDemo}
          />
        );
      case 7:
        return <HasBeenLogged handleViewDemo={this.handleViewDemo} />;
      default:
        return (
          <LoginPage
            handleOnEnded={this.handleOnRedirect}
            handleMusicBG={this._handleMusicBG}
            bg_music_on_off={this.state.bg_music_on_off}
          />
        );
    }
  }
  render() {
    return <div className="App">{this.renderView()}</div>;
  }
}

export default App;
