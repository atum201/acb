import React from "react";

class PaginationButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          onClick={this.props.onClick}
          className="myButton"
          style={{
            color: `${this.props.color}`,
            cursor: "pointer"
          }}
        >
          {this.props.text}
        </div>
      </React.Fragment>
    );
  }
}

export default PaginationButton;
