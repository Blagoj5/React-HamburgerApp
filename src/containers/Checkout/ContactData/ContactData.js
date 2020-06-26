import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandling from "../../../hoc/withErrorHandling/withErrorHandling";
import * as actionCreators from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = (props) => {
  const [formValid, setFormValid] = useState(false);
  const [orderForm, setOrderForm] = useState({
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
  });

  const changeInputHandler = (event, elementIdentifier) => {
    const updatedFormElement = updateObject(orderForm[elementIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[elementIdentifier].validation
      ),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [elementIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputElementIdentifier in updatedOrderForm) {
      formIsValid =
        updatedOrderForm[inputElementIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormValid(formIsValid);
  };

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let inputType in orderForm) {
      formData[inputType] = orderForm[inputType].value;
    }

    const orders = {
      ingredients: props.ingr,
      price: props.totalP,
      orderData: formData,
      userId: props.userId,
    };

    props.burgerOrderStart(orders, props.token);

    // One way, you can pass the whole state or part of the state to the other component OR with search queries
    // this.props.history.push("/checkout", this.state.ingredients);
  };

  let orderArr = [];
  for (let key in orderForm) {
    orderArr.push({
      id: key,
      config: { ...orderForm[key] },
    });
  }

  let form = (
    <form className={styles.Inputs} onSubmit={orderHandler}>
      {orderArr.map((formElement) => {
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
      <Button btnType="Success" disable={formValid}>
        ORDER NOW
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={styles.ContactData}>
      <h3>Enter you contact information</h3>
      {form}
    </div>
  );
};

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
