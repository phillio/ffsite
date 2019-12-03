import React from "react";
import Button from "../Button";
import logo from "../../pics/logo.png";

import "./Landing.css";

function Login() {
  return (
    <div className="landing-page">
      <img className="app-logo" src={logo} alt="logo"></img>
      <p>Fantasy Noobs - Gridiron Edition</p>
      <Button href="/home" className="send-button" buttonText="Pretend Login"/>
    </div>
  );
}

export default Login;
