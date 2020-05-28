import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandling from "../../../hoc/withErrorHandling/withErrorHandling";
import * as actionCreators from "../../../store/actions/index";

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
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
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
        validation: {},
        valid: true,
      },
    },
    formValid: false,
  };

  checkValidation = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  changeInputHandler = (event, elementIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[elementIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[elementIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputElementIdentifier in updatedOrderForm) {
      formIsValid =
        updatedOrderForm[inputElementIdentifier].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formValid: formIsValid,
    });
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let inputType in this.state.orderForm) {
      formData[inputType] = this.state.orderForm[inputType].value;
    }

    const orders = {
      ingredients: this.props.ingr,
      price: this.props.totalP,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.burgerOrderStart(orders, this.props.token);

    // One way, you can pass the whole state or part of the state to the other component OR with search queries
    // this.props.history.push("/checkout", this.state.ingredients);
  };

  render() {
    let orderArr = [];
    for (let key in this.state.orderForm) {
      orderArr.push({
        id: key,
        config: { ...this.state.orderForm[key] },
      });
    }

    let form = (
      <form className={styles.Inputs} onSubmit={this.orderHandler}>
        {orderArr.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              isInvalid={!formElement.config.valid}
              touched={formElement.config.touched}
              change={(event) => this.changeInputHandler(event, formElement.id)}
            />
          );
        })}
        <Button btnType="Success" disable={!this.state.formValid}>
          ORDER NOW
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h3>Enter you contact information</h3>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerBuilder.ingredients,
    totalP: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    burgerOrderStart: (orderData, token) => {
      dispatch(actionCreators.purchaseBurger(orderData, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(ContactData, axios));
