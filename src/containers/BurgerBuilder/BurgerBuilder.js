import React, { useState, useEffect } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchase, setPurchase] = useState(false);

  const checkPurchasable = (ingredients) => {
    const ingredientsValues = Object.values(ingredients).reduce(
      (sum, currentEl) => {
        return sum + currentEl;
      },
      0
    );
    return ingredientsValues > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchase(true);
    } else {
      props.setRedirectAuthUrl("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchase(false);
  };

  const purchaseContinueHandler = () => {
    props.initPurchase();
    props.history.push("/checkout");
  };

  useEffect(() => {
    props.initIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disabledInfo = {
    ...props.ingr,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0; // return salad: true, cheese: false
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients cannot be fetched</p> : <Spinner />;

  if (props.ingr) {
    burger = (
      <>
        <Burger ingredients={props.ingr} />
        <BuildControls
          addIngredient={props.addIngredientHandler}
          removeIngredient={props.removeIngredientHandler}
          disabled={disabledInfo}
          currentPrice={props.totalP}
          disableCheckout={!checkPurchasable(props.ingr)}
          purchase={purchaseHandler}
          isAuthenticated={props.isAuth}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingr}
        cancelPurchase={purchaseCancelHandler}
        continuePurchase={purchaseContinueHandler}
        price={props.totalP}
      />
    );
  }

  return (
    <>
      <Modal show={purchase} onClose={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

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
