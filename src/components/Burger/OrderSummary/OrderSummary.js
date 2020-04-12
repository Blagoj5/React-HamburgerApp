import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const showIngredients = Object.keys(props.ingredients).map(ingredientKey => {
    return (
      <li key={ingredientKey}>
        <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>:{" "}
        {props.ingredients[ingredientKey]}
      </li>
    );
  });

  return (
    <>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{showIngredients}</ul>
      <p>
        <strong>{props.price.toFixed(2)}</strong>
      </p>
      <Button btnType={"Danger"} clicked={props.cancelPurchase}>
        Cancel
      </Button>
      <Button btnType={"Success"} clicked={props.continuePurchase}>
        Continue
      </Button>
    </>
  );
};

export default orderSummary;
