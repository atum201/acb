import React from "react";
import { Container, Row, Col } from "reactstrap";
import PaginationButton from "./PaginationButton";
import PaginationButtonNumber from "./PaginationButtonNumber";
import { PropTypes } from "prop-types";

const renderPageNumberWithoutLink = (getListByPage, current, length) => {
  var jsx = [];
  if (length > 5) {
    if (current > 1)
      jsx.push(
        <React.Fragment key={"fragment3"}>
          <PaginationButton
            onClick={() => {
              getListByPage(1);
            }}
            text={"FIRST"}
            color={"#9A9A9A"}
          />
          <PaginationButton
            onClick={() => {
              getListByPage(current - 1);
            }}
            text={"PREVIOUS"}
            color={"#9A9A9A"}
          />
        </React.Fragment>
      );
    if (window.innerWidth > 400) {
      for (let i = current - 2; i < current + 3; i++) {
        if (i > 0 && i <= length)
          jsx.push(
            <PaginationButtonNumber
              onClick={() => {
                getListByPage(i);
              }}
              text={i}
              color={"#2C2C2C"}
              active={i === current}
              key={i}
            />
          );
      }
    } else if (window.innerWidth < 400) {
      jsx.push(
        <PaginationButtonNumber
          onClick={() => {
            getListByPage(current);
          }}
          text={current}
          color={"#2C2C2C"}
          active={true}
        />
      );
    }
    if (current < length)
      jsx.push(
        <React.Fragment key={"fragment4"}>
          <PaginationButton
            key={"NEXT"}
            onClick={() => {
              getListByPage(current + 1);
            }}
            text={"NEXT"}
            color={"#2C2C2C"}
          />
          <PaginationButton
            key={"LAST"}
            onClick={() => {
              getListByPage(length);
            }}
            text={"LAST"}
            color={"#2C2C2C"}
          />
        </React.Fragment>
      );
  } else if (length <= 5) {
    for (let i = 0; i < length; i++) {
      jsx.push(
        <PaginationButtonNumber
          onClick={() => {
            getListByPage(i + 1);
          }}
          text={i + 1}
          color={"#2C2C2C"}
          active={i + 1 === current}
          key={i}
        />
      );
    }
  }
  return jsx;
};

const Pagination = ({ getListByPage, page, totalPages, linkTo }) => {
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col>
            <div className="myPagination">
              {renderPageNumberWithoutLink(getListByPage, page, totalPages)}
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Pagination;
Pagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  linkTo: PropTypes.string,
  getListByPage: PropTypes.func
};
Pagination.defaultProps = {
  linkTo: ""
};
