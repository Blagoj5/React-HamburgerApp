import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let elementType = null;
  const inputElementyStyle = [classes.InputElement];

  if (props.isInvalid && props.touched) {
    inputElementyStyle.push(classes.ElementError);
  }

  switch (props.elementType) {
    case "input":
      elementType = (
        <input
          onChange={props.change}
          {...props.elementConfig}
          className={inputElementyStyle.join(" ")}
          value={props.value}
        />
      );
      break;
    case "textarea":
      elementType = (
        <textarea
          {...props.elementConfig}
          className={inputElementyStyle.join(" ")}
          value={props.value}
        />
      );
      break;
    case "select":
      elementType = (
        <select className={classes.Select} onChange={props.change}>
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      elementType = (
        <input
          onChange={props.change}
          {...props.elementConfig}
          className={inputElementyStyle.join(" ")}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {elementType}
    </div>
  );
};

export default input;
