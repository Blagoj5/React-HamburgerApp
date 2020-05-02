import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const arrayOrders = [];
        for (let key in res.data) {
          console.log(res.data);
          arrayOrders.push({
            id: key,
            ...res.data[key],
          });
        }

        this.setState({ loading: false, orders: arrayOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    let displayOrders = null;
    if (this.state.orders.length > 0) {
      displayOrders = this.state.orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            totalPrice={order.price}
          />
        );
      });
    }

    return <div>{displayOrders}</div>;
  }
}

export default withErrorHandling(Orders, axios);
