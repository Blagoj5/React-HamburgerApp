import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

const authSuccess = (tokenId, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId: tokenId,
    userId: userId,
  };
};

const refreshErrorState = () => {
  return {
    type: actionTypes.REFRESH_ERROR_STATE,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expireDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const logoutOnExpire = (expireTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expireTime * 1000);
  };
};

export const auth = (email, password, isSigning) => {
  return (dispatch) => {
    dispatch(authStart());
    let signInfo = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSAfLeeKblpMabytwtQRbq1fKDzjE_ea8";
    if (isSigning) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSAfLeeKblpMabytwtQRbq1fKDzjE_ea8";
    }
    axios
      .post(url, signInfo)
      .then((response) => {
        // expireDate will be the time in miliseconds
        const expireDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expireDate", expireDate);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(logoutOnExpire(response.data.expiresIn));
      })
      .catch((err) => {
        // refreshErrorState refreshes my error state in case i submit again with the same info
        // OR with wrong info without reloading the page (in that case the prev error is saved, and my alert won't display)
        dispatch(refreshErrorState());
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setRedirectAuthUrl = (url) => {
  return {
    type: actionTypes.SET_REDIRECT_AUTH_URL,
    url: url,
  };
};

export const checkAuthStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const expireDate = new Date(localStorage.getItem("expireDate"));
      const dateNow = new Date().getTime();
      if (expireDate > dateNow) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        //  Transforming it back to Seconds Because The function logoutOnExpire then transforms it back to miliseconds
        dispatch(logoutOnExpire((expireDate - dateNow) / 1000));
      } else {
        dispatch(authLogout());
      }
    } else {
      dispatch(authLogout());
    }
  };
};
