import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

export class Checkout extends Component {
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  // Old method for when u want to fetch the state via the routing this.props.location.state propery and then recieve it store it  in local storage in case u refresh the page
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   let ingredients = {};
  //   for (let param of query.entries()) {
  //     //  The + means it needs to be INTEGER
  //     ingredients[param[0]] = +param[1];
  //   }
  //   let totalP = 0;
  //   try {
  //     totalP = this.props.location.state.totalPrice;
  //     localStorage.setItem("totalPrice", JSON.stringify(totalP.toFixed(2)));
  //     localStorage.setItem("ingredients", JSON.stringify(ingredients));
  //   } catch (error) {
  //     // If it comes here it means i refreshed page and lost state
  //     totalP = JSON.parse(localStorage.getItem("totalPrice"));
  //     ingredients = JSON.parse(localStorage.getItem("ingredients"));
  //   }
  //   this.setState({
  //     ingredients: ingredients,
  //     // totalprice throws error  because the state from the redirecting isn't saving on refresh
  //     // way to solve it: save it in local storage and pull it from there
  //     // or just use it from url
  //     totalPrice: totalP,
  //   });
  // }

  componentWillMount() {
    if (!JSON.parse(localStorage.getItem("ingredients"))) {
      localStorage.setItem("ingredients", JSON.stringify(this.props.ingr));
      localStorage.setItem(
        "totalPrice",
        JSON.stringify(this.props.totalP.toFixed(2))
      );
    }

    // this.setState({
    //   localStorageIngredients: JSON.parse(localStorage.getItem("ingredients")),
    // });
    // this.setState({
    //   localStoragePrice: JSON.parse(localStorage.getItem("totalPrice")),
    // });
    const prevNeededState = {
      ingredients: JSON.parse(localStorage.getItem("ingredients")),
      totalPrice: +JSON.parse(localStorage.getItem("totalPrice")),
    };

    // When the page refreshes or something, make sure that the state is the same as the one before refresh
    this.props.updateStateOnRefresh(prevNeededState);
  }

  componentWillUnmount() {
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("ingredients");
    this.props.initialStateActivation();
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingr}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          // No need for this method, since u recieve the state from REDUX, so there's no need to pass it
          // render={(props) => (
          //   <ContactData
          //     ingredients={this.state.ingredients}
          //     totalPrice={this.state.totalPrice}
          //     {...props}
          //   />
          // )}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.ingredients,
    totalP: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStateOnRefresh: (prevState) =>
      dispatch({
        type: actionTypes.UPDATE_STATE_ON_REFRESH,
        prevState: prevState,
      }),
    initialStateActivation: () =>
      dispatch({
        type: actionTypes.RELOAD_INITIAL_STAGE,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
