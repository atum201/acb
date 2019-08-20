import callApi from "utils/callApi";

const Game = {
  getGameResult() {
    return callApi("game/result", "GET").then(res => res.data);
  },
  getGameResultFinish() {
    return callApi("game/list-finish-result?status=FINISHED", "GET").then(
      res => res.data
    );
  },
  getGameResultDetail(data) {
    return callApi(
      "game/result-detail/" + data.id + "?page=" + data.page,
      "GET"
    ).then(res => res.data);
  },
  getGameInfo() {
    return callApi("info/detail", "GET").then(res => res.data);
  },
  getGameInfoPending() {
    return callApi("game/info-pending-page", "GET").then(res => res.data);
  }
};

export default Game;
