import React from "react";
import classes from "./Navigationitems.module.css";
import NavigationItem from "./Navigationitem/Navigationitem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems} onClick={props.clicked}>
      <NavigationItem link="/" active>
        Burger
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Authentication</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
