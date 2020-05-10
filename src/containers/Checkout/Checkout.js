import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";

export class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    for (let param of query.entries()) {
      //  The + means it needs to be INTEGER
      ingredients[param[0]] = +param[1];
    }
    let totalP = 0;
    try {
      totalP = this.props.location.state.totalPrice;
      localStorage.setItem("totalPrice", JSON.stringify(totalP.toFixed(2)));
      localStorage.setItem("ingredients", JSON.stringify(ingredients));
    } catch (error) {
      // If it comes here it means i refreshed page and lost state
      totalP = JSON.parse(localStorage.getItem("totalPrice"));
      ingredients = JSON.parse(localStorage.getItem("ingredients"));
    }
    this.setState({
      ingredients: ingredients,
      // totalprice throws error  because the state from the redirecting isn't saving on refresh
      // way to solve it: save it in local storage and pull it from there
      // or just use it from url
      totalPrice: totalP,
    });
  }

  componentWillUnmount() {
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("ingredients");
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
