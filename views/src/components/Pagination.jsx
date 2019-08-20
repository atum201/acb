import React, { Component } from "react";

class Pagination extends Component {
  state = {};

  renderPagination = () => {
    const total = parseInt(this.props.total);
    const current = parseInt(this.props.current);
    var jsx = [];
    const URL = "/listwinner/" + this.props.sort;
    if (total > 5) {
      if (current > 1)
        jsx.push(
          <React.Fragment>
            <li key="last">
              <a href={URL + "?page=1"}>{"|<"}</a>
            </li>
            <li key="prev">
              <a href={URL + "?page=" + (current - 1)}>{"<<"}</a>
            </li>
          </React.Fragment>
        );
      if (window.innerWidth > 400) {
        for (let i = current - 2; i < current + 3; i++) {
          if (i > 0 && i <= total)
            jsx.push(
              <li key={i} className={current === i ? "active" : ""}>
                <a href={URL + "?page=" + i}>{i}</a>
              </li>
            );
        }
      } else if (window.innerWidth < 400) {
        jsx.push(
          <li className={"active"} key={current}>
            <a href={URL + "?page=" + current}>{current}</a>
          </li>
        );
      }
      if (current < total)
        jsx.push(
          <React.Fragment>
            <li key={"next"}>
              <a href={URL + "?page=" + (current + 1)}>{">>"}</a>
            </li>
            <li key={"last"}>
              <a href={URL + "?page=" + total}>{">|"}</a>
            </li>
          </React.Fragment>
        );
    } else if (total <= 5) {
      for (let i = 0; i < total; i++) {
        jsx.push(
          <li key={i + 1} className={current === i + 1 ? "active" : ""}>
            <a href={URL + "?page=" + (i + 1)}>{i + 1}</a>
          </li>
        );
      }
    }
    return jsx;
  };

  render() {
    return (
      <div className="pagination">
        <ul>{this.renderPagination()}</ul>
      </div>
    );
  }
}

export default Pagination;
Pagination.propTypes = {};
Pagination.defaultProps = {};
