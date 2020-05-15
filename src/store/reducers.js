import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    meat: 0,
    salad: 0,
    bacon: 0,
    cheese: 0,
  },
  totalPrice: 4,
};

const INGREDIENTS_PRICES = {
  cheese: 0.4,
  salad: 0.6,
  bacon: 0.7,
  meat: 0.8,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      console.log("logic for removing ingredient");
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
      };
    case actionTypes.UPDATE_STATE_ON_REFRESH:
      return {
        ...action.prevState,
      };
    case actionTypes.RELOAD_INITIAL_STAGE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
