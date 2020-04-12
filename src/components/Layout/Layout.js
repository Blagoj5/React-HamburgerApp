import React, { Component } from "react";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };

  render() {
    return (
      <>
        <Toolbar sideDrawerToggle={this.sideDrawerToggleHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
