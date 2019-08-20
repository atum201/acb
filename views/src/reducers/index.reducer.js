import { combineReducers } from "redux";
import fetchReducer from "./fetch.reducer";
import adminReducer from "./admin.reducer";
import gameReducer from "./game.reducer";
import authentication from "./authentication.reducer";
import question from "./question.reducer";
import user from "./user.reducer";
import adminaccount from "./adminaccount.reducer";
import setupinfo from "./setupinfo.reducer";

import bannerReducer from "./banner.reducer";

const appReducers = combineReducers({
  fetchReducer,
  adminReducer,
  authentication,
  gameReducer,
  question,
  user,
  adminaccount,
  setupinfo,
  bannerReducer
});

export default appReducers;
