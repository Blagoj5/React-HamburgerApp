import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/Navigationitems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let classesArray = [classes.SideDrawer, classes.Close];
  if (props.show) {
    classesArray = [classes.SideDrawer, classes.Open];
  }

  return (
    <>
      <Backdrop show={props.show} clicked={props.close} />
      <div className={classesArray.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
