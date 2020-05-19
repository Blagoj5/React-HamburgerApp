import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as burgerActionCreators from "../../store/actions/index";

export class Checkout extends Component {
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentWillMount() {
    if (!JSON.parse(localStorage.getItem("ingredients"))) {
      localStorage.setItem("ingredients", JSON.stringify(this.props.ingr));
      localStorage.setItem(
        "totalPrice",
        JSON.stringify(this.props.totalP.toFixed(2))
      );
    }

    const prevNeededState = {
      ingredients: JSON.parse(localStorage.getItem("ingredients")),
      totalPrice: +JSON.parse(localStorage.getItem("totalPrice")),
    };

    // When the page refreshes or something, make sure that the state is the same as the one before refresh
    this.props.saveIngrStateOnRefresh(prevNeededState);
  }

  componentWillUnmount() {
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("ingredients");
    this.props.initialStateActivation();
  }

  render() {
    let checkoutSummary = <Redirect to="/" />;
    let purchased = this.props.purchased ? <Redirect to="/" /> : null;

    if (this.props.ingr) {
      checkoutSummary = (
        <div>
          {purchased}
          <CheckoutSummary
            ingredients={this.props.ingr}
            cancelCheckout={this.cancelCheckoutHandler}
            continueCheckout={this.continueCheckoutHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return checkoutSummary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerBuilder.ingredients,
    totalP: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveIngrStateOnRefresh: (prevState) =>
      dispatch(burgerActionCreators.saveIngrStateOnRefresh(prevState)),
    initialStateActivation: () =>
      dispatch(burgerActionCreators.reloadIngrInitialState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
