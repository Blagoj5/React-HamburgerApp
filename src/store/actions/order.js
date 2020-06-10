import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER_REQUEST,
    orderData: orderData,
    token: token,
  };
};

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

export const initOrdersSuccess = (orders) => {
  return {
    type: actionTypes.INIT_ORDERS_SUCCESS,
    orders: orders,
  };
};
export const initOrdersFail = (err) => {
  return {
    type: actionTypes.INIT_ORDERS_FAIL,
    error: err,
  };
};

export const initOrdersStart = () => {
  return {
    type: actionTypes.INIT_ORDERS_START,
  };
};

export const initOrders = (token, userId) => {
  return {
    type: actionTypes.INIT_ORDERS_REQUEST,
    token: token,
    userId: userId,
  };
};
