import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/Navigationitems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.sideDrawerToggle} />
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
