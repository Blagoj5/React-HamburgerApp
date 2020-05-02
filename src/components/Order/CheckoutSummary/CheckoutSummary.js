import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Thanks for ordering this delicious BURGER!</h1>
      <div style={{ textAlign: "center", width: "100%" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType={"Danger"} clicked={props.cancelCheckout}>
        Cancel
      </Button>
      <Button btnType={"Success"} clicked={props.continueCheckout}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
