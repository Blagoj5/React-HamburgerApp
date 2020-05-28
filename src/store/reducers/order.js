import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrderData = {
    ...action.orderData,
    id: action.orderId,
  };
  return updateObject(state, {
    orders: state.orders.concat(newOrderData),
    loading: false,
    purchased: true,
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const initPurchase = (state, action) => {
  return updateObject(state, { purchased: false });
};

const initOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const initOrdersSucces = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const initOrdersFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.INIT_PURCHASE:
      return initPurchase(state, action);

    case actionTypes.INIT_ORDERS_START:
      return initOrdersStart(state, action);

    case actionTypes.INIT_ORDERS_SUCCESS:
      return initOrdersSucces(state, action);

    case actionTypes.INIT_ORDERS_FAIL:
      return initOrdersFail(state, action);

    default:
      return state;
  }
};

export default reducer;
