import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchase: false,
    loading: false,
  };

  checkPurchasable = (ingredients) => {
    const ingredientsValues = Object.values(ingredients).reduce(
      (sum, currentEl) => {
        return sum + currentEl;
      },
      0
    );
    return ingredientsValues > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchase: true });
    } else {
      this.props.setRedirectAuthUrl("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchase: false });
  };

  purchaseContinueHandler = () => {
    this.props.initPurchase();
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  render() {
    console.log();
    const disabledInfo = {
      ...this.props.ingr,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // return salad: true, cheese: false
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients cannot be fetched</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingr) {
      burger = (
        <>
          <Burger ingredients={this.props.ingr} />
          <BuildControls
            addIngredient={this.props.addIngredientHandler}
            removeIngredient={this.props.removeIngredientHandler}
            disabled={disabledInfo}
            currentPrice={this.props.totalP}
            disableCheckout={!this.checkPurchasable(this.props.ingr)}
            purchase={this.purchaseHandler}
            isAuthenticated={this.props.isAuth}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingr}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          price={this.props.totalP}
        />
      );
    }

    return (
      <>
        <Modal show={this.state.purchase} onClose={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerBuilder.ingredients,
    totalP: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingredientName) =>
      dispatch(actionCreators.addIngredient(ingredientName)),
    removeIngredientHandler: (ingredientName) =>
      dispatch(actionCreators.removeIngredient(ingredientName)),
    initIngredients: () => dispatch(actionCreators.initIngredients()),
    initPurchase: () => dispatch(actionCreators.initPurchase()),
    setRedirectAuthUrl: (url) =>
      dispatch(actionCreators.setRedirectAuthUrl(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(BurgerBuilder, axios));
