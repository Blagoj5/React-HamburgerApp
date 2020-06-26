import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandling = (WrappedComponent, axios) => {
  return (props) => {
    const [error, dismissErrorHandler] = useHttpErrorHandler(axios);

    console.log(error);
    return (
      <>
        <Modal show={error} onClose={dismissErrorHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandling;
