import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./DrawerToggle.module.css";

const drawerToggle = (props) => {
  return (
    <div className={styles.DrawerToggle} onClick={props.clicked}>
      <FontAwesomeIcon icon={faBars} size="2x" />
    </div>
  );
};

export default drawerToggle;
