import React from "react";
import logo from "../../pics/logo.png";

import "./Login.css";

function Login() {
  return (
    <header className="app-header">
      <img className="app-logo" src={logo} alt="logo"></img>
      <p>Fantasy Noobs - Gridiron Edition</p>
      <a href="/home">
        <button className="go-to-page-button">Pretend Login</button>
      </a>
    </header>
  );
}

export default Login;
