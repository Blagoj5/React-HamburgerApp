import React from "react";
import logoImg from "../../assets/burger-logo.png";
import { Logo } from "./Logo.module.css";

const logo = (props) => {
  return (
    <div className={Logo}>
      <img src={logoImg} alt="My Burger" />
    </div>
  );
};

export default logo;
