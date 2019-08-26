import * as Types from "../variables/actionTypes";
var initialState = {
  listNews: {},
  newsDetail: {}
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTNEWS:
      return { ...state, listNews: action.listNews };
    case Types.GET_NEWSBYID:
      return { ...state, newsDetail: action.newsDetail };
    case Types.DELETE_NEWS:
      return {listNews: state.listNews.filter(x=>x.news_id !== action.news_id)};
    default:
      return state;
  }
};

export default newsReducer;
