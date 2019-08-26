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
import enterpriseReducer from "./enterprise.reducer";
import eventReducer from "./event.reducer";
import factReducer from "./fact.reducer";
import newsReducer from "./news.reducer";
import videoReducer from "./video.reducer";
import accountReducer from "./account.reducer";
import registerReducer from "./register.reducer";

const appReducers = combineReducers({
  fetchReducer,
  adminReducer,
  authentication,
  gameReducer,
  question,
  user,
  adminaccount,
  setupinfo,
  bannerReducer,
  enterpriseReducer,
  eventReducer,
	factReducer,
	newsReducer,
	videoReducer,
	accountReducer,
	registerReducer
});

export default appReducers;
