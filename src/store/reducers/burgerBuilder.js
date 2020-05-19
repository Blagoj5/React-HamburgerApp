import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

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

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
  });
  return updatedState;
};

const removeIngredient = (state, action) => {
  const updatedIngr = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngrs = updateObject(state.ingredients, updatedIngr);
  const updatedSt = updateObject(state, {
    ingredients: updatedIngrs,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
  });
  return updatedSt;
};

const saveIngrStateOnRefresh = (state, action) => {
  return updateObject(state, action.prevState);
};

const reloadIngrInitialState = (state, action) => {
  return {
    ...initialState,
  };
};

const initIngredients = (state, action) => {
  const ingredientsSorted = {
    salad: action.ingredients.salad,
    bacon: action.ingredients.bacon,
    cheese: action.ingredients.cheese,
    meat: action.ingredients.meat,
  };
  const updatedStateIngr = updateObject(state, {
    ingredients: ingredientsSorted,
    error: false,
  });
  return updatedStateIngr;
};

const errorLoadingIngredients = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SAVE_INGR_STATE_ON_REFRESH:
      return saveIngrStateOnRefresh(state, action);
    case actionTypes.RELOAD_INGR_INITIAL_STATE:
      return reloadIngrInitialState(state, action);
    case actionTypes.INIT_INGREDIENTS:
      return initIngredients(state, action);
    case actionTypes.ERROR_LOADING_INGREDIENTS:
      return errorLoadingIngredients(state, action);
    default:
      return state;
  }
};

export default reducer;
