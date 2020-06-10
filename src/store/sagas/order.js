import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(actions.purchaseBurgerStart());
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* initOrdersSaga(action) {
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("/orders.json" + queryParams);
    yield put(actions.initOrdersStart());
    const arrayOrders = [];
    for (let key in response.data) {
      arrayOrders.push({
        id: key,
        ...response.data[key],
      });
    }
    yield put(actions.initOrdersSuccess(arrayOrders));
  } catch (err) {
    yield put(actions.initOrdersFail(err));
  }
}
