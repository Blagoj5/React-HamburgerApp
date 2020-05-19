import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: {
    meat: 0,
    salad: 0,
    bacon: 0,
    cheese: 0,
  },
  totalPrice: 4,
  error: false,
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
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
      };
    case actionTypes.SAVE_INGR_STATE_ON_REFRESH:
      return {
        ...state,
        ...action.prevState,
      };
    case actionTypes.RELOAD_INGR_INITIAL_STATE:
      return {
        ...initialState,
      };
    case actionTypes.INIT_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
      };
    case actionTypes.ERROR_LOADING_INGREDIENTS:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
