import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as burgerActionCreators from "../../store/actions/index";

const Checkout = (props) => {
  const cancelCheckoutHandler = () => {
    props.history.goBack();
  };

  const continueCheckoutHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let checkoutSummary = <Redirect to="/" />;
  let purchased = props.purchased ? <Redirect to="/" /> : null;

  // // This function is in case if u want this.props.purchased by default to be true, in order to have redirects in case someone doesn't have added ingreridents so by default u redirect them.
  // // However in a case where the user builds a hamburger first without being logged in and clicks on the sign up button (and he signs in), you  need to allow him to go straight to checkout, so u need to evade the default redirect.
  // if (this.props.building && this.props.purchased) {
  //   purchased = null;
  // }

  if (props.ingr) {
    checkoutSummary = (
      <div>
        {purchased}
        <CheckoutSummary
          ingredients={props.ingr}
          cancelCheckout={cancelCheckoutHandler}
          continueCheckout={continueCheckoutHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }

  return checkoutSummary;
};

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerBuilder.ingredients,
    totalP: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
    // building: state.burgerBuilder.building,
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
