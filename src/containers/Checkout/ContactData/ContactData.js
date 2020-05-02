import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      city: "",
      street: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => this.setState({ loading: false }));

    // One way, you can pass the whole state or part of the state to the other component OR with search queries
    // this.props.history.push("/checkout", this.state.ingredients);
  };

  render() {
    let form = (
      <form className={styles.Inputs}>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="city" placeholder="Your City" />
        <input type="text" name="street" placeholder="Your Street" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER NOW
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter you contact information</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
