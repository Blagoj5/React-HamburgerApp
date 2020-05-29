import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerStart());
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

const initOrdersSuccess = (orders) => {
  return {
    type: actionTypes.INIT_ORDERS_SUCCESS,
    orders: orders,
  };
};
const initOrdersFail = (err) => {
  return {
    type: actionTypes.INIT_ORDERS_FAIL,
    error: err,
  };
};

const initOrdersStart = () => {
  return {
    type: actionTypes.INIT_ORDERS_START,
  };
};

export const initOrders = (token, userId) => {
  return (dispatch) => {
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        dispatch(initOrdersStart());
        const arrayOrders = [];
        for (let key in res.data) {
          arrayOrders.push({
            id: key,
            ...res.data[key],
          });
        }
        dispatch(initOrdersSuccess(arrayOrders));
      })
      .catch((err) => {
        dispatch(initOrdersFail(err));
      });
  };
};
