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
import { actGetListGameID } from "../../../actions/game.action";
import { formatStringToDate } from "../../../utils/formatDate";
import { formatMoney } from "../../../utils/formatMoney";
class GameView extends Component {
  componentDidMount() {
    this._getListGameID();
  }
  _getListGameID = () => {
    this.props.getListGameID(this.props.match.params.id);
  };

  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { listGameDetail } = this.props;
    return (
      <React.Fragment>
        <Container>
          <PanelHeader size="sm" />
          <div className="content">
            <Card className="card-GameView">
              <CardBody>
                <CardTitle title="h5">Xem chi tiết câu hỏi</CardTitle>
                <Row className="announ-header">
                  <Col xs={6}>
                    <Label>Game ID</Label>
                    <p>
                      {listGameDetail.data ? listGameDetail.data.game_id : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Tên Game</Label>
                    <p>{listGameDetail.data ? listGameDetail.data.name : ""}</p>
                  </Col>
                  <Col xs={6}>
                    <Label>Số Tiền:</Label>
                    <p>
                      {listGameDetail.data
                        ? formatMoney(parseInt(listGameDetail.data.bonus)) + "₫"
                        : ""}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <Label>Ngày tạo:</Label>
                    <p>
                      {listGameDetail.data
                        ? formatStringToDate(listGameDetail.data.createdAt)
                        : ""}
                    </p>
                  </Col>
                  <Col xs={12}>
                    <Label>Gợi ý :</Label>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: listGameDetail.data
                          ? listGameDetail.data.recommend
                          : ""
                      }}
                    />
                  </Col>
                </Row>
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
    listGameDetail: state.gameReducer.gameDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListGameID: id => {
      dispatch(actGetListGameID(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);
GameView.propTypes = {
  expenditure: PropsType.object,
  getExpenditureID: PropsType.func,
  match: PropsType.object
};
GameView.defaultProps = {
  listGameDetail: {
    data: {}
  }
};
