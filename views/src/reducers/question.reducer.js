import * as Types from "../variables/actionTypes";
var initialState = {
  questionDetail: {},
  listQuestion: {},
  infoGame: {}
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_QUESTIONBYID:
      return { ...state, questionDetail: action.questionDetail };
    case Types.GET_LISTQUESTIOB:
      return { ...state, listQuestion: action.listQuestion };
    case Types.GET_LISTINFOGAME:
      return { ...state, infoGame: action.infoGame };
    default:
      return state;
  }
};

export default questionReducer;
