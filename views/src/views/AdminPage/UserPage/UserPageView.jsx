import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Label,
  Container
} from "reactstrap";
import { Button } from "components";
import { PanelHeader } from "components";
import PropsType from "prop-types";
import { connect } from "react-redux";
import { actgetDetailUSerID } from "../../../actions/user.action";
import { formatMoney } from "../../../utils/formatMoney";
class UserPageView extends Component {
  componentDidMount() {
    this._getDetailUSerID();
  }
  _getDetailUSerID = () => {
    this.props.getDetailUSerID(this.props.match.params.id);
  };

  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { listuserDetail } = this.props;
    return (
      <React.Fragment>
        <Container>
          <PanelHeader size="sm" />
          <div className="content">
            <Card className="card-UserPageView">
              <CardBody>
                <CardTitle title="h5">Các game đã chơi</CardTitle>
                {listuserDetail.docs &&
                  listuserDetail.docs.map((props, key) => {
                    return (
                      <Row className="announ-header" key={key}>
                        <Col xs={3}>
                          <Label>Game ID</Label>
                          <p>{props.game_id}</p>
                        </Col>
                        <Col xs={3}>
                          <Label>Tên Game</Label>
                          <p>{props.game ? props.game.name : ""}</p>
                        </Col>
                        <Col xs={3}>
                          <Label>Số Tiền:</Label>
                          <p>{formatMoney(parseInt(props.bonus)) + "₫"}</p>
                        </Col>
                        <Col xs={3}>
                          <Label>Trạng thái</Label>
                          <p>{props.status}</p>
                        </Col>
                      </Row>
                    );
                  })}
                <div className="button-container text-center">
                  <Button className="btn_done" onClick={this.goBack}>
                    <i className="fas fa-check" /> &nbsp; Hoàn tất
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    listuserDetail: state.user.userDetail.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetailUSerID: id => {
      dispatch(actgetDetailUSerID(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPageView);
UserPageView.propTypes = {
  expenditure: PropsType.object,
  getExpenditureID: PropsType.func,
  match: PropsType.object
};
UserPageView.defaultProps = {
  listuserDetail: {
    docs: []
  }
};
