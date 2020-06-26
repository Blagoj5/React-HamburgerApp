import React, { useEffect } from "react";
import { authLogout } from "../../../store/actions/index";
import { Redirect } from "react-router";
import { connect } from "react-redux";

const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(authLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Logout);
