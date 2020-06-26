import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import { connect } from "react-redux";
import { auth, setRedirectAuthUrl } from "../../store/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/UI/Spinner/Spinner";
import Alert from "../../components/UI/Alert/Alert";
import { Redirect } from "react-router";
import { checkValidity } from "../../shared/utility";

const Auth = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [signUp, setSignUp] = useState(true);
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  useEffect(() => {
    if (!props.building && props.redirectAuthUrl !== "/") {
      props.setDefaultRedirectUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeInputHandler = (event, elementIdentifier) => {
    // You can also do this with updateObject utility, check CotnactData component for example
    const updatedForm = {
      ...controls,
      [elementIdentifier]: {
        ...controls[elementIdentifier],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[elementIdentifier].validation
        ),
        touched: true,
      },
    };

    let isValid = true;
    for (let elementType in updatedForm) {
      isValid = updatedForm[elementType].valid && isValid;
    }

    setControls(updatedForm);
    setFormIsValid(isValid);
  };

  const signHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, signUp);
  };

  const switchSignModHandler = () => {
    setSignUp(!signUp);
  };

  const formData = [];
  for (let key in controls) {
    formData.push({
      id: key,
      config: controls[key],
    });
  }

  let form = props.token ? (
    <Redirect to={props.redirectAuthUrl} />
  ) : (
    <Spinner />
  );

  if (!props.loading && !props.token) {
    form = (
      <form method="POST" onSubmit={signHandler}>
        {formData.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              isInvalid={!formElement.config.valid}
              touched={formElement.config.touched}
              change={(event) => changeInputHandler(event, formElement.id)}
            />
          );
        })}
        <Button btnType="Success" disable={!formIsValid}>
          {signUp ? "Sign Up" : "Sign In"}
        </Button>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FontAwesomeIcon
            icon={faExchangeAlt}
            size="2x"
            style={{ cursor: "pointer" }}
            onClick={switchSignModHandler}
          />
        </div>
      </form>
    );
  }

  return (
    <div className={styles.Auth}>
      {props.error ? <Alert message={props.error.message} /> : null}
      {/* {props.token ? <Redirect to="/" /> : null} */}
      <h3>Enter Information</h3>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token !== null,
    redirectAuthUrl: state.auth.redirectAuthUrl,
    building: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSigning) =>
      dispatch(auth(email, password, isSigning)),
    setDefaultRedirectUrl: () => dispatch(setRedirectAuthUrl("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
