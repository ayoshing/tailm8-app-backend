import {
  GET_PROFILE,
  PROFILE_LOADING,
  OPEN_MENU_DRAWER,
  CLOSE_MENU_DRAWER,
  GET_ERRORS
} from "./types";

const API_PROFILE_URL = "http://localhost:3001/api/profile";

export const createProfile = (profileData, history) => dispatch => {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.jwt
    },
    body: JSON.stringify(profileData)
  };

  fetch(API_PROFILE_URL, config)
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: GET_PROFILE,
        payload: json
      });
      history.push("/");
    });
};

export const getCurrentProfileAction = userId => dispatch => {
  dispatch(profileLoadingAction());

  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.jwt
    }
  };

  fetch(API_PROFILE_URL, config)
    // .then(res => {
    //   if (res.ok) {
    //     return res.json();
    //   }
    //   throw new Error("Get profile error");
    // })
    .then(res => {
      if (res.status === 404 || res.status === 400) {
        res.json().then(json => {
          dispatch({
            type: GET_ERRORS,
            payload: json
          });
          dispatch({
            type: GET_PROFILE,
            payload: {}
          });
        });
      } else {
        res.json().then(json =>
          dispatch({
            type: GET_PROFILE,
            payload: json
          })
        );
      }
    });
};

export const profileLoadingAction = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const openMenuAction = () => {
  return {
    type: OPEN_MENU_DRAWER
  };
};

export const closeMenuAction = () => {
  return {
    type: CLOSE_MENU_DRAWER
  };
};
