import React, { Component } from "react";
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

export class Auth extends Component {
  state = {
    controls: {
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
    },
    formIsValid: false,
    signUp: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.redirectAuthUrl !== "/") {
      this.props.setDefaultRedirectUrl();
    }
  }

  changeInputHandler = (event, elementIdentifier) => {
    // You can also do this with updateObject utility, check CotnactData component for example
    const updatedForm = {
      ...this.state.controls,
      [elementIdentifier]: {
        ...this.state.controls[elementIdentifier],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[elementIdentifier].validation
        ),
        touched: true,
      },
    };

    let isValid = true;
    for (let elementType in updatedForm) {
      isValid = updatedForm[elementType].valid && isValid;
    }

    this.setState({
      controls: updatedForm,
      formIsValid: isValid,
    });
  };

  signHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.signUp
    );
  };

  switchSignModHandler = () => {
    this.setState((prevState) => {
      return {
        signUp: !prevState.signUp,
      };
    });
  };

  render() {
    const formData = [];
    for (let key in this.state.controls) {
      formData.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = this.props.token ? (
      <Redirect to={this.props.redirectAuthUrl} />
    ) : (
      <Spinner />
    );

    if (!this.props.loading && !this.props.token) {
      form = (
        <form method="POST" onSubmit={this.signHandler}>
          {formData.map((formElement) => {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                isInvalid={!formElement.config.valid}
                touched={formElement.config.touched}
                change={(event) =>
                  this.changeInputHandler(event, formElement.id)
                }
              />
            );
          })}
          <Button btnType="Success" disable={!this.state.formIsValid}>
            {this.state.signUp ? "Sign Up" : "Sign In"}
          </Button>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FontAwesomeIcon
              icon={faExchangeAlt}
              size="2x"
              style={{ cursor: "pointer" }}
              onClick={this.switchSignModHandler}
            />
          </div>
        </form>
      );
    }

    return (
      <div className={styles.Auth}>
        {this.props.error ? <Alert message={this.props.error.message} /> : null}
        {/* {this.props.token ? <Redirect to="/" /> : null} */}
        <h3>Enter Information</h3>
        {form}
      </div>
    );
  }
}

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
