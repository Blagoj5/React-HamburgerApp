import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";

const INGREDIENTS_PRICES = {
  cheese: 0.4,
  salad: 0.6,
  bacon: 0.7,
  meat: 0.8,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
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
    this.setState({ purchasable: ingredientsValues > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newIngredients = {
      ...this.state.ingredients,
    };
    newIngredients[type] = oldCount + 1;
    const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
    this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    this.checkPurchasable(newIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount - 1 >= 0) {
      const newIngredients = {
        ...this.state.ingredients,
      };
      newIngredients[type] = oldCount - 1;
      const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
      this.setState({ ingredients: newIngredients, totalPrice: newPrice });
      this.checkPurchasable(newIngredients);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchase: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchase: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const orders = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: "Blagoj",
        adress: {
          street: "Kozara",
          city: "Bitola",
        },
      },
      deliveryMethod: "fast",
    };
    axios
      .post("/orders.json", orders)
      .then((response) => this.setState({ loading: false, purchase: false }))
      .catch((err) => this.setState({ loading: false, purchase: false }));
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
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            currentPrice={this.state.totalPrice}
            disableCheckout={!this.state.purchasable}
            purchase={this.purchaseHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          price={this.state.totalPrice}
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

export default withErrorHandling(BurgerBuilder, axios);
