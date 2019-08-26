import * as Types from "../variables/actionTypes";
var initialState = {
  listEvent: {},
  eventDetail: {}
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LISTEVENT:
      return { ...state, listEvent: action.listEvent };
    case Types.GET_EVENTBYID:
      return { ...state, eventDetail: action.eventDetail };
    case Types.DELETE_EVENT:
      return {listEvent: state.listEvent.filter(x=>x.event_id !== action.event_id)};
    default:
      return state;
  }
};

export default eventReducer;
