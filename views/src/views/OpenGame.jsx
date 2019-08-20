import React, { Component } from "react";
import { socketGlobal } from "../utils/instanceSocket";

class OpenGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game_id: ''
    };
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOpenGameOnClick = () => {
    socketGlobal.emit('openGame', {
      game_id: this.state.game_id
    });
  }

  handleShutDownOnClick = () => {
    socketGlobal.emit('shutDownGame', {
      game_id: this.state.game_id
    });
  }

  render() {


    return (<div>
      Game id: <input type="text" name="game_id" onChange={this.handleOnChange} /><br />
      <input type="button" value="Open" onClick={this.handleOpenGameOnClick} /><br />
      <input type="button" value="Shut Down" onClick={this.handleShutDownOnClick} />
    </div>);
  }
}

export default OpenGame;
