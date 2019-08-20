import React from "react";

class PaginationButtonNumber extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={
          this.props.active
            ? "myButton myButtonNumber myActive"
            : "myButton myButtonNumber"
        }
        style={{
          color: `${this.props.color}`,
          cursor: "pointer"
        }}
      >
        {this.props.text}
      </div>
    );
  }
}

export default PaginationButtonNumber;
