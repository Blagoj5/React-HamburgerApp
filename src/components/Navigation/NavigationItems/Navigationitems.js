import React from "react";
import classes from "./Navigationitems.module.css";
import NavigationItem from "./Navigationitem/Navigationitem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        Burger
      </NavigationItem>
      <NavigationItem link="/orders">Checkout</NavigationItem>
    </ul>
  );
};

export default navigationItems;
