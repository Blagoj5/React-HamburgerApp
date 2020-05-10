import React from "react";
import classes from "./Button.module.css";

const button = (props) => {
  console.log("button disable:" + props.disable);
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
      disabled={props.disable}
    >
      {props.children}
    </button>
  );
};

export default button;
