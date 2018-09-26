import { CLEAR_ERRORS, GET_ERRORS, RESET } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return initialState;
    case RESET:
      return initialState;
    default:
      return state;
  }
}
