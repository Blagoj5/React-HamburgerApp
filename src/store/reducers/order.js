import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrderData = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrderData),
        loading: false,
        purchased: true,
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.INIT_PURCHASE:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.INIT_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.INIT_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.INIT_ORDERS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default reducer;
