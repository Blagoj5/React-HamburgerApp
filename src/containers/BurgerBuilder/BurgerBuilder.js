import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchase: false,
    loading: false,
    error: false,
  };

  checkPurchasable = (ingredients) => {
    // solving with using for
    // console.log("checking purchasable");
    // let itDidBreak = false;
    // const ingredientsValues = Object.values(ingredients);
    // for (let ingredientValue of ingredientsValues) {
    //   if (ingredientValue > 0) {
    //     itDidBreak = true;
    //     this.setState({ purchasable: true });
    //     break;
    //   }
    // }
    // if (!itDidBreak) {
    //   this.setState({ purchasable: false });
    // }

    const ingredientsValues = Object.values(ingredients).reduce(
      (sum, currentEl) => {
        return sum + currentEl;
      },
      0
    );
    return ingredientsValues > 0;
  };

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const newIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   newIngredients[type] = oldCount + 1;
  //   const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
  //   this.setState({ ingredients: newIngredients, totalPrice: newPrice });
  //   this.checkPurchasable(newIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount - 1 >= 0) {
  //     const newIngredients = {
  //       ...this.state.ingredients,
  //     };
  //     newIngredients[type] = oldCount - 1;
  //     const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
  //     this.setState({ ingredients: newIngredients, totalPrice: newPrice });
  //     this.checkPurchasable(newIngredients);
  //   }
  // };

  purchaseHandler = () => {
    this.setState({ purchase: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchase: false });
  };

  purchaseContinueHandler = () => {
    let queryParams = [];
    for (let ingredient in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(ingredient) +
          "=" +
          encodeURIComponent(this.state.ingredients[ingredient])
      );
    }
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
      state: { totalPrice: this.state.totalPrice },
    });
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((err) => {
        console.log("here");
        this.setState({ error: true });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // return salad: true, cheese: false
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients cannot be fetched</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
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

    if (this.state.loading) {
      orderSummary = <Spinner />;
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
    ingr: state.ingredients,
    totalP: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingredientName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName,
      }),
    removeIngredientHandler: (ingredientName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(BurgerBuilder, axios));
