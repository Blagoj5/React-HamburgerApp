import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Cheese", type: "cheese" },
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        <strong>{props.currentPrice.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            ingredientLabel={ctrl.label}
            added={() => props.addIngredient(ctrl.type)}
            removed={() => props.removeIngredient(ctrl.type)}
            disable={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={props.disableCheckout}
        onClick={props.purchase}
      >
        Checkout
      </button>
    </div>
  );
};

export default BuildControls;
