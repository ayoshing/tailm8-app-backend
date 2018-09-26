import {
  GET_PROFILE,
  PROFILE_LOADING,
  RESET,
  OPEN_MENU_DRAWER,
  CLOSE_MENU_DRAWER
} from "../actions/types";

const initialState = {
  profile: {},
  profiles: null,
  loading: false,
  menuOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case OPEN_MENU_DRAWER:
      return {
        ...state,
        menuOpen: true
      };
    case CLOSE_MENU_DRAWER:
      return {
        ...state,
        menuOpen: false
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
