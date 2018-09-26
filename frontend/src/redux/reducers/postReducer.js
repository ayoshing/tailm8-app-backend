import {
  GET_ALL_POSTS,
  OPEN_POST_SNACKBAR,
  CLOSE_POST_SNACKBAR,
  OPEN_POST_DIALOG,
  CLOSE_POST_DIALOG,
  RESET
} from "../actions/types";

const initialState = {
  posts: [],
  dialAction: "",
  isPosted: false,
  snackBarOpen: false,
  snackBarVertical: "bottom",
  snackBarHorizontal: "left",
  snackBarMsg: "",
  dialogOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case OPEN_POST_SNACKBAR:
      return {
        ...state,
        snackBarOpen: true,
        snackBarMsg: action.payload
      };
    case CLOSE_POST_SNACKBAR:
      return {
        ...state,
        snackBarOpen: false
      };
    case OPEN_POST_DIALOG:
      return {
        ...state,
        dialogOpen: true
      };
    case CLOSE_POST_DIALOG:
      return {
        ...state,
        dialogOpen: false
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
