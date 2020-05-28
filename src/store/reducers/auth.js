import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  redirectAuthUrl: "/",
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.tokenId,
    userId: action.userId,
    loading: false,
    error: null,
  });
};

const authFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const refreshErrorState = (state, action) => {
  return updateObject(state, { error: null });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const setRedirectAuthUrl = (state, action) => {
  return updateObject(state, { redirectAuthUrl: action.url });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.REFRESH_ERROR_STATE:
      return refreshErrorState(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_REDIRECT_AUTH_URL:
      return setRedirectAuthUrl(state, action);
    default:
      return state;
  }
};

export default reducer;
