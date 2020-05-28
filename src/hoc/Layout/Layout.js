import React, { Component } from "react";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          sideDrawerToggle={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          show={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
