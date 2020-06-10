import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

export const authSuccess = (tokenId, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId: tokenId,
    userId: userId,
  };
};

export const refreshErrorState = () => {
  return {
    type: actionTypes.REFRESH_ERROR_STATE,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutOnExpiredTimeout = (expireTime) => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT_ON_EXPIRE,
    expireTime: expireTime,
  };
};

export const auth = (email, password, isSigning) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSigning: isSigning,
  };
};

export const setRedirectAuthUrl = (url) => {
  return {
    type: actionTypes.SET_REDIRECT_AUTH_URL,
    url: url,
  };
};

export const checkAuthStatus = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATUS,
  };
};
