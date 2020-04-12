import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const drawerToggle = (props) => {
  return (
    <div onClick={props.clicked} style={{ width: "" }}>
      <FontAwesomeIcon icon={faBars} size="2x" />
    </div>
  );
};

export default drawerToggle;
