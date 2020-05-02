import React from "react";
import classes from "./Burger.module.css";
import Burgeringredient from "./ingredients/Burgeringredient";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientKey) => {
      console.log(props.ingredients[ingredientKey]);
      return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
        return (
          <Burgeringredient type={ingredientKey} key={ingredientKey + index} />
        );
      });
    })
    .reduce((previous, current) => {
      return previous.concat(current);
    });

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <Burgeringredient type="bread-top" />
      {transformedIngredients}
      <Burgeringredient type="bread-bottom" />
    </div>
  );
};

export default burger;
