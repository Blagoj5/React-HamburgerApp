import React, { useEffect, useState } from "react";
import styles from "./Alert.module.css";

const Alert = (props) => {
  const [showAlert, setShowAlert] = useState(true);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    //   im timing this with the Alert opacity disappear transition so it disappears on time
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // A forced useeffect to make the whole div disappear after the transition is done
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const dismissAlertHandler = () => {
    setShowAlert(false);
  };

  let alert = (
    <div
      style={{
        opacity: showAlert ? "1" : "0",
      }}
      className={styles.Alert}
      onClick={dismissAlertHandler}
    >
      <p>
        {props.message
          ? props.message
          : "Ooops something went wrong. Try again"}
      </p>
    </div>
  );

  if (!display) {
    alert = null;
  }

  return alert;
};

export default Alert;
