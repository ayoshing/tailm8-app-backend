import { SET_CURRENT_USER, RESET } from "../actions/types";
import isEmpty from "../../validations/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
