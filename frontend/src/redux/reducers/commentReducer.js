import {
  GET_ALL_COMMENTS,
  OPEN_COMMENT_DIALOG,
  CLOSE_COMMENT_DIALOG,
  RESET
} from "../actions/types";

const initialState = {
  comments: [],
  dialogOpen: false,
  postId: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        commentLoading: false
      };
    case OPEN_COMMENT_DIALOG:
      return {
        ...state,
        dialogOpen: true,
        postId: action.payload
      };
    case CLOSE_COMMENT_DIALOG:
      return {
        ...state,
        dialogOpen: false,
        postId: ""
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
