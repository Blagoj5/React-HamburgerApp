import { takeEvery, all, takeLatest } from "redux-saga/effects";
import {
  logoutSaga,
  logoutOnExpiredTimeoutSaga,
  authUserSaga,
  checkAuthStatusSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, initOrdersSaga } from "./order";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(
      actionTypes.AUTH_INITIATE_LOGOUT_ON_EXPIRE,
      logoutOnExpiredTimeoutSaga
    ),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATUS, checkAuthStatusSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS_SIGNAL, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER_REQUEST, purchaseBurgerSaga);
  yield takeEvery(actionTypes.INIT_ORDERS_REQUEST, initOrdersSaga);
}
