import {
  OPEN_COMMENT_DIALOG,
  CLOSE_COMMENT_DIALOG,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";
import { openSnackBarAction, getPostsAction } from "./postActions";

const API_POSTS_URL = "https://tailm8.herokuapp.com/api/posts";

export const createCommentAction = (
  commentData,
  postId,
  history
) => dispatch => {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.jwt
    },
    body: JSON.stringify(commentData)
  };

  return fetch(`${API_POSTS_URL}/${postId}/comments`, config).then(res => {
    if (res.status === 400) {
      res.json().then(json => {
        dispatch({
          type: GET_ERRORS,
          payload: json
        });
      });
    } else {
      dispatch({
        type: CLEAR_ERRORS
      });
      res
        .json()
        .then(json => {
          dispatch(openSnackBarAction("Comment Added"));
          dispatch(closeCommentDialogAction());
        })
        .then(json => dispatch(getPostsAction()));
    }
  });
};

export const openCommentDialogAction = postId => {
  return {
    type: OPEN_COMMENT_DIALOG,
    payload: postId
  };
};

export const closeCommentDialogAction = () => {
  return {
    type: CLOSE_COMMENT_DIALOG
  };
};
