import { RESET, GET_FRIENDS } from "../actions/types";

const initialState = {
  friends: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
