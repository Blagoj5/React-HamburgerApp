import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.props.onInitOrders(this.props.token, this.props.userId);
  }

  render() {
    let displayOrders = <Spinner />;
    if (!this.props.loading) {
      displayOrders = this.props.orders.map((order) => {
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

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitOrders: (token, userId) =>
      dispatch(actionCreators.initOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(Orders, axios));
