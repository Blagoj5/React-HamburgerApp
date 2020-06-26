import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     this.props.children !== nextProps.children
  //   );
  // }

  return (
    <>
      <Backdrop show={props.show} clicked={props.onClose} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default React.memo(Modal, (prevProps, nextProps) => {
  return (
    nextProps.show === prevProps.show &&
    prevProps.children === nextProps.children
  );
});
