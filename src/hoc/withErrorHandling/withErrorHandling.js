import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandling = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
    }

    componentWillMount() {
      this.reqInteceptor = axios.interceptors.request.use(
        (req) => {
          this.setState({ error: null });
          return req;
        },
        (err) => err
      );
      this.resInteceptor = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err });
          return err;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInteceptor);
      axios.interceptors.response.eject(this.resInteceptor);
    }

    dismissErrorHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal show={this.state.error} onClose={this.dismissErrorHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandling;
