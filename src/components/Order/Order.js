import React from "react";
import styles from "./Order.module.css";

const order = (props) => {
  console.log(props.ingredients);
  let ingredients = Object.entries(props.ingredients).map((ingredient) => {
    return (
      <span
        key={ingredient[0]}
        style={{ textTransform: "capitalize", marginRight: "10px" }}
      >
        {ingredient[0]}: ({ingredient[1]})
      </span>
    );
  });
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Total Price: <strong>USD: {props.totalPrice}</strong>
      </p>
    </div>
  );
};

export default order;
