import { put, delay, call } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/index";
import axios from "axios";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "userId");
  yield call([localStorage, "removeItem"], "expireDate");
  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}

export function* logoutOnExpiredTimeoutSaga(action) {
  yield delay(action.expireTime * 1000);
  yield put(actions.authLogout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  let signInfo = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSAfLeeKblpMabytwtQRbq1fKDzjE_ea8";
  if (action.isSigning) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSAfLeeKblpMabytwtQRbq1fKDzjE_ea8";
  }

  try {
    const response = yield axios.post(url, signInfo);

    // expireDate will be the time in miliseconds
    const expireDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("expireDate", expireDate);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.logoutOnExpiredTimeout(response.data.expiresIn));
  } catch (err) {
    // refreshErrorState refreshes my error state in case i submit again with the same info
    // OR with wrong info without reloading the page (in that case the prev error is saved, and my alert won't display)
    yield put(actions.refreshErrorState());
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* checkAuthStatusSaga(action) {
  const token = yield localStorage.getItem("token");
  if (token) {
    const expireDate = yield new Date(localStorage.getItem("expireDate"));
    const dateNow = yield new Date().getTime();
    if (expireDate > dateNow) {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      //  Transforming it back to Seconds Because The function logoutOnExpiredTimeout then transforms it back to miliseconds
      yield put(actions.logoutOnExpiredTimeout((expireDate - dateNow) / 1000));
    } else {
      yield put(actions.authLogout());
    }
  } else {
    yield put(actions.authLogout());
  }
}
