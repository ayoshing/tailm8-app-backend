import { GET_ERRORS, CLEAR_ERRORS, GET_FRIENDS } from "./types";

const API_PROFILE_URL = "https://tailm8.herokuapp.com/api/profile";

export const requestFriendAction = profileId => dispatch => {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.jwt
    }
  };

  return fetch(`${API_PROFILE_URL}/${profileId}/request-friend`, config).then(
    res => {
      if (res.status === 422 || res.status === 404) {
        res.json().then(json => {
          dispatch({
            type: GET_ERRORS,
            payload: json
          });
        });
      } else {
        res.json().then(json => dispatch(getFriendsList(json)));
      }
    }
  );
};

export const getFriendsList = json => {
  return {
    type: GET_FRIENDS,
    payload: json
  };
};
