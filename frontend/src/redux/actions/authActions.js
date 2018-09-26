import { GET_ERRORS, SET_CURRENT_USER, RESET } from "./types";
import jwtDecode from "jwt-decode";
import { getCurrentProfileAction } from "./profileActions";
import { getPostsAction } from "./postActions";
import axios from "axios";

const API_USERS_URL = "api/users";

export const signUpUser = (userData, history) => dispatch => {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  };

  // fetch(API_USERS_URL, config)
  axios.post(API_USERS_URL, userData).then(res => {
    if (res.status === 400) {
      res.json().then(json =>
        dispatch({
          type: GET_ERRORS,
          payload: json
        })
      );
    } else {
      history.push("/");
    }
  });
};

export const logInUser = (userData, history) => dispatch => {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  };

  // fetch(`${API_USERS_URL}/login`, config)
  axios
    .post(`${API_USERS_URL}/login`, userData)
    .then(res => res.json())
    .then(json => {
      if (json.token) {
        const { token } = json;
        localStorage.setItem("jwt", token);
        const decodedJwt = jwtDecode(token);
        dispatch(setCurrentUser(decodedJwt));
        dispatch(getCurrentProfileAction(decodedJwt.id));
        dispatch(getPostsAction());
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: json
        });
      }
    })
    .then(json => history.push("/"));
};

export const getCurrentUser = () => dispatch => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.jwt
    }
  };

  // fetch(`${API_USERS_URL}/current`, config)
  axios
    .get(`${API_USERS_URL}/current`, config)
    .then(res => res.json())
    .then(json => dispatch(setCurrentUser(json)));
};

export const setCurrentUser = decodedJwt => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedJwt
  };
};

export const logOutUserAction = () => {
  return {
    type: RESET
  };
};
