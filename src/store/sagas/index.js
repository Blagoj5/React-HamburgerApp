import { takeEvery } from "redux-saga/effects";
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
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(
    actionTypes.AUTH_INITIATE_LOGOUT_ON_EXPIRE,
    logoutOnExpiredTimeoutSaga
  );
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATUS, checkAuthStatusSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS_SIGNAL, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER_REQUEST, purchaseBurgerSaga);
  yield takeEvery(actionTypes.INIT_ORDERS_REQUEST, initOrdersSaga);
}
