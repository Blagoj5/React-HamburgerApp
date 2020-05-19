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

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(purchaseBurgerStart());
        console.log(response);
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

export const initOrders = () => {
  return (dispatch) => {
    axios
      .get("/orders.json")
      .then((res) => {
        dispatch(initOrdersStart());
        const arrayOrders = [];
        for (let key in res.data) {
          console.log(res.data);
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
