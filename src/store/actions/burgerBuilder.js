import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const saveIngrStateOnRefresh = (prevNeededState) => {
  return {
    type: actionTypes.SAVE_INGR_STATE_ON_REFRESH,
    prevState: { ...prevNeededState },
  };
};

export const reloadIngrInitialState = () => {
  return {
    type: actionTypes.RELOAD_INGR_INITIAL_STATE,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: { ...ingredients },
  };
};

const errorLoadingIngredients = () => {
  return {
    type: actionTypes.ERROR_LOADING_INGREDIENTS,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((err) => {
        dispatch(errorLoadingIngredients());
      });
  };
};
